import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Ticket } from 'src/app/models/ticket.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DataService } from 'src/app/services/data.service';

@Component(
  {
    selector: 'app-ticket-edit',
    templateUrl: './ticket-edit.component.html',
    styleUrls: ['./ticket-edit.component.scss']
  })
export class TicketEditComponent implements OnInit {
  @Input() ticket: any;

  form: FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];


  constructor(private dialog: NgbActiveModal, private dataService: DataService, private apiservice: ApiServiceService,
    private toastr: ToastrService) {
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;


    console.log("editocmp")
    console.log(this.ticket);

  }

  ngOnInit(): void {
    this.form = new FormGroup
      ({
        title: new FormControl({ value: this.ticket.title, disabled: true }, Validators.required),
        desc: new FormControl({ value: this.ticket.desc, disabled: true }, Validators.required),
        category: new FormControl({ value: this.ticket.category, disabled: true }, Validators.required),
        priority: new FormControl({ value: this.ticket.priority, disabled: true }, Validators.required),
        comment: new FormControl({ value: null, disabled: false }, Validators.required),
        status: new FormControl({ value: null, disabled: false }, Validators.required),
      });



    let ticketdata = {
      title: this.ticket.title,
      desc: this.ticket.description,
      category: this.ticket.department,
      priority: this.ticket.priority,
      comment: "",
      status: this.ticket.status
    }

    this.form.setValue(ticketdata);

  }

  onCancel() {
    this.dialog.close();
  }

  onSave() {
    let aa = this.form
    this.putTicketStatus();
    this.dialog.close();
  }
  putTicketStatus() {
    const obj = {
      ticketId : this.ticket.ticketId,
      comment: this.form.value.comment,
      status: this.form.value.status     
    }
    console.log(obj);
    this.apiservice.editTicketById(obj).subscribe((response: any) => {
      this.toastr.success('Status updated successfully!', 'Success');
    });

  }
}
