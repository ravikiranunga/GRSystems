import { Ticket } from 'src/app/models/ticket.model';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TicketNewComponent } from '../ticket-new/ticket-new.component';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { bottom, right, top } from '@popperjs/core';
import { Category } from 'src/app/models/category.model';
import { TicketEditComponent } from '../ticket-edit/ticket-edit.component';

import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component(
  {
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
  })
export class TicketListComponent implements OnInit {
  @ViewChild('ticketTable') table: ElementRef;
  role: string;
  changes: any;
  tickets: Ticket[];
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];
  selectedTicket: Ticket;
  tick: Ticket[];
  categorySelected: string = "All";
  statusSelected: string = "All";
  prioritySelcted: string = "All";

  filteredTickets: Ticket[];
  catTicket: Ticket[];
  statTicket: Ticket[];
  priTicket: Ticket[];
  TicketId: string;
  Title: string;

  closetick: Ticket[];
  closedTicketsCount: number;

  opentick: Ticket[];
  openTicketsCount: number;

  pendtick: Ticket[];
  pendingTicketCount: number;

  lowCount: number;
  mediumCount: number;

  highCount: number;
  ticketlowCount: Ticket[];

  ticketmediumCount: Ticket[];
  tickethighCount: Ticket[];

  model: NgbDateStruct;
  date: { year: number, month: number };

  userName: any;

  constructor(private dataService: DataService, private modalService: NgbModal, private calendar: NgbCalendar,
    private apiservice: ApiServiceService, private httpClient: HttpClient, private toastr: ToastrService, private authSerive: AuthService) {
    //this.tickets = dataService.ELEMENT_DATA;
    this.changes = dataService.CHANGE_DATA;
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;

  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'User';
    this.userName = localStorage.getItem('UserName');
    //Api call
    if (this.role == 'User') {
      this.ticketByuser();
    }
    else { this.GetAllTickets(); }
    
    this.GetAllDepartments();
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);

    this.selectedTicket = { ticketId: 0, number: '', title: '', department: '', description: '', createdOn: '', resolvedDate: '', createrName: '', createrId: '', status: '', priority: '', resolverName: '' }

  }
  getSelectedRowData(ticket: Ticket) {
    this.selectedTicket = ticket;
  }
  categoryChanged(value: string) {
    this.catTicket = this.tickets.filter((ticket: any) => {
      return ticket.department == this.categorySelected;
    })

    this.categorySelected = value;
    console.log(value);

  }

  statuschanged(value: string) {
    this.statTicket = this.tickets.filter((ticket: any) => {
      ticket.status == this.statusSelected;
    })
    this.statusSelected = value;
    console.log(value);

  }

  prioorityChanged(value: string) {
    this.priTicket = this.tickets.filter((ticket: any) => {
      ticket.priority == this.prioritySelcted
    })
    this.prioritySelcted = value;
    console.log(value);
  }

  SubmitClicked() {
    var categorySelected = this.categorySelected;
    var statusSelected = this.statusSelected;
    var prioritySelcted = this.prioritySelcted;

    this.filteredTickets = this.tickets.filter((ticket: any) => {
      return ((ticket.department == categorySelected || categorySelected == "All") && (ticket.status == statusSelected
        || statusSelected == "All") && (ticket.priority == prioritySelcted || prioritySelcted == "All"));
    })

    console.log(this.TicketId);
    console.log(this.Title);
  }

  clearFilters() {

  }

  createTicket() {
    const dialog = this.modalService.open(TicketNewComponent);
    
  }

  viewTicket(ticket: Ticket) {
    const dialog = this.modalService.open(TicketDetailComponent);
    dialog.componentInstance.ticket = ticket;
  }

  editTicket(ticket: Ticket) {
    this.dataService.EditTicketData(ticket);
    const dialog = this.modalService.open(TicketEditComponent);
    dialog.componentInstance.ticket = ticket;

  }

  TicketByStatus() {
    const chart1 = new Chart("chart1",
      {
        type: 'doughnut',
        data: {
          labels: ['Open', 'In Progress', 'Closed'],
          datasets: [{
            label: 'Tickets',
            data: [this.openTicketsCount, this.pendingTicketCount, this.closedTicketsCount],
            backgroundColor:
              [
                '#0d6efd',
                '#ffc107',
                '#198754',
              ],
            borderWidth: 0,
            datalabels: { anchor: 'center' }
          }]
        },

        options:
        {
          cutout: '60%',
          radius: '80%',
          maintainAspectRatio: false,
          plugins: { legend: { position: top, labels: { boxWidth: 10 } }, datalabels: { color: 'white', font: { weight: 'bold', size: 15 }, display: true } },
        }
      });
  }
  TicketByPriority() {
    const chart2 = new Chart("chart2",
      {
        type: 'doughnut',
        data: {
          labels: ['High', 'Medium', 'Low'],
          datasets: [{
            label: 'Tickets',
            data: [this.highCount, this.mediumCount, this.lowCount],
            backgroundColor:
              [
                '#dc3545',
                '#ffc107',
                '#198754',
              ],
            borderWidth: 0,
            datalabels: { anchor: 'center' }
          }]
        },

        options:
        {
          cutout: '60%',
          radius: '80%',
          maintainAspectRatio: false,
          plugins: { legend: { position: top, labels: { boxWidth: 10 } }, datalabels: { color: 'white', font: { weight: 'bold', size: 15 }, display: true } },
        }
      });
  }
  deleteTicket(tickId: number) {
    this.apiservice.updateTicket(tickId).pipe(finalize(() => { })).subscribe((response: any) => {
      this.toastr.success('Ticket Deleted successfully', 'Success');
      this.GetAllTickets();

    })

  }
  GetAllTickets() {
    this.apiservice.GetAllTickets().subscribe((response: any) => {
      this.tickets = response;

      this.closetick = response.filter((x: any) => x.status === 'Closed')
      this.closedTicketsCount = this.closetick.length;


      this.opentick = response.filter((x: any) => x.status === 'Pending at admin')
      this.openTicketsCount = this.opentick.length;

      this.pendtick = response.filter((x: any) => x.status === 'Pending at Super Admin')
      this.pendingTicketCount = this.pendtick.length;

      this.ticketlowCount = response.filter((x: any) => x.priority === 'Low-Priority')
      this.lowCount = this.ticketlowCount.length;

      this.ticketmediumCount = response.filter((x: any) => x.priority === 'Medium-Priority')
      this.mediumCount = this.ticketmediumCount.length;

      this.tickethighCount = response.filter((x: any) => x.priority === 'High-Priority')
      this.highCount = this.tickethighCount.length;
      this.TicketByStatus();
      this.TicketByPriority();      
      this.filteredTickets = this.tickets;
    });
  }
  GetAllDepartments() {
    this.apiservice.GetAllDepartments().pipe(finalize(() => { })).subscribe((response: any) => {
      this.categoryList = response;
    });
  }
  ticketByuser() {
    this.apiservice.ticketByuser(this.userName).pipe(finalize(() => { })).subscribe((response: any) => {
      this.tickets = response;
      this.filteredTickets = this.tickets;
    });
  }

}
