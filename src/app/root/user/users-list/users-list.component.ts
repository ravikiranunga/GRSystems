import { Chart, registerables } from 'chart.js';
import { User } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { top } from '@popperjs/core';
import { DataService } from 'src/app/services/data.service';
import { UsersNewComponent } from '../users-new/users-new.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UsersEditComponent } from '../users-edit/users-edit.component';


import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StickyDirection } from '@angular/cdk/table';

@Component(
  {
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
  })
export class UsersListComponent implements OnInit {
  @ViewChild('ticketTable') table: ElementRef;

  items: User[];
  selectedItem: User;
  public chart1: Chart;
  employeeId:string;
  name:string;
  email:string;

  constructor(private dataService: DataService, private modalService: NgbModal, private apiservie: ApiServiceService,
    private toastr:ToastrService) {
     this.items = dataService.USER_DATA;
  }

  ngOnInit(): void {
    //api call
    this.GetAllUsers();
    this.getChart();
    Chart.register(...registerables);
    Chart.register(ChartDataLabels);    
  }
  getChart(){
    this.chart1= new Chart("chart1",
      {
        type: 'doughnut',
        data: {
          labels: ['Open', 'In Progress', 'Closed'],
          datasets: [{
            label: 'Tickets',
            data: [this.selectedItem.totalTickets, this.selectedItem.openTickets, this.selectedItem.closedTickets],
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

  getSelectedRowData(user: User) {
    if (this.chart1) this.chart1.destroy();    
    this.selectedItem = user;
    this.getChart();
  }

  clearFilters() {

  }

  createUser() {
    const dialog = this.modalService.open(UsersNewComponent);
  }

  editUser(user: User) {
    const dialog = this.modalService.open(UsersEditComponent);
    dialog.componentInstance.user = user;
  }

  deleteUser(employeeId:number) {
    this.apiservie.deleteUserbyId(employeeId).pipe(finalize(()=> {})).subscribe((response: any)=>{
    this.toastr.success('user deleted successfully','Success');
    this.GetAllUsers();
    })

  }
  GetAllUsers() {
    this.apiservie.GetAllUsers().pipe(finalize(() => { })).subscribe((response: any) => {
      this.items = response;
      this.selectedItem=response[0];
    });
  }

}
