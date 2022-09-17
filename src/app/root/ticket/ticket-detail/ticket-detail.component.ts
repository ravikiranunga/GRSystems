import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DataService } from 'src/app/services/data.service';
import { Ticket } from 'src/app/models/ticket.model';
@Component(
  {
    selector: 'app-ticket-detail',
    templateUrl: './ticket-detail.component.html',
    styleUrls: ['./ticket-detail.component.scss']
  })
export class TicketDetailComponent implements OnInit {
  @Input() ticket: any;

  form: FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];
  changes: any;
  tickets: Ticket[];

  constructor(private dialog: NgbActiveModal, private dataService: DataService,private apiservice:ApiServiceService) {
    this.changes = dataService.CHANGE_DATA;
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;
  }

  ngOnInit(): void {
    this.GetAllTickets();
    this.form = new FormGroup
      ({
        title: new FormControl({ value: this.ticket.title, disabled: true }, Validators.required),
        desc: new FormControl({ value: this.ticket.desc, disabled: true }, Validators.required),
        category: new FormControl({ value: this.ticket.category, disabled: true }, Validators.required),
        priority: new FormControl({ value: this.ticket.priority, disabled: true }, Validators.required),
        comment: new FormControl({ value: this.ticket.comment, disabled: true }, Validators.required),
        status: new FormControl({ value: this.ticket.status, disabled: true }, Validators.required),
      });

    let ticketdata = {
      title: this.ticket.title,
      desc: this.ticket.description,
      category: this.ticket.department,
      priority: this.ticket.priority,
      comment: this.ticket.comment,
      status: this.ticket.status
    }

    this.form.setValue(ticketdata);
    this.changes=[
      {date:this.ticket.createdOn,Title:'Created'},
      {date:this.ticket.assigned,Title:'Assigned'},
      {date:this.ticket.escalatedLevel1,Title:'Escalated Level 1'},
      {date:this.ticket.escalatedLevel2,Title:'Escalated Level 2'},
      {date:this.ticket.escalatedLevel3,Title:'Escalated Level 3'},
      {date:this.ticket.closedDate,Title:'Closed Date'},
    
  ]
  }

  onCancel() {
    this.dialog.close();
  }
  GetAllTickets() {
    this.apiservice.GetAllTickets().subscribe((response: any) => {
      this.tickets = response;
    });
  }
}
