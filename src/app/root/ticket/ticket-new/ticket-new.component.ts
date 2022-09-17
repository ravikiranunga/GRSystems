import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Ticket } from 'src/app/models/ticket.model';
import { finalize, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
@Component(
  {
    selector: 'app-ticket-new',
    templateUrl: './ticket-new.component.html',
    styleUrls: ['./ticket-new.component.scss']
  })
export class TicketNewComponent implements OnInit {
  form: FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];
  file:File;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  objdata:any;
  ticket: Ticket[];
  userName: any;

  constructor(private dialog: NgbActiveModal, private dataService: DataService, private apiservice: ApiServiceService,
    private httpClient: HttpClient, private toastr: ToastrService) {
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('UserName');    
    //bind departments
    this.GetAllDepartments();
    this.form = new FormGroup
      ({
        title: new FormControl(null, Validators.required),
        Description: new FormControl(null, Validators.required),
        Department: new FormControl('2', Validators.required),
        priority: new FormControl('3', Validators.required),
        // docs:  new FormControl('', [Validators.required]),
      });
  }
  GetAllDepartments() {
    this.apiservice.GetAllDepartments().pipe(finalize(() => { })).subscribe((response: any) => {
      this.categoryList = response;
    });
  }
  onCancel() {
    this.dialog.close();
  }

  onSave() {
    let aa = this.form
    this.Posttickets();
    this.dialog.close();
  }
  Posttickets() {
    this.objdata = {
      UserName: this.userName,
      Department: this.form.value.Department,
      Description: this.form.value.Description,
      Priority: this.form.value.priority,
      title:this.form.value.title
      //Document: this.form.value.docs
    }
    console.log(this.objdata);
    this.apiservice.ticket = this.objdata;
    this.onUpload();
    //this.ticketlist.ticketByuser();
  }
  // onFileChange(event: any) {
  //   this.file = event.target.files[0];
  //   this.form.patchValue({
  //     docs:this.file
  //   })
  //   this.form.get('docs')?.updateValueAndValidity();
    
  // }
    onUpload() {
      this.objdata = {
        UserName: this.userName,
        Department: this.form.value.Department,
        Description: this.form.value.Description,
        Priority: this.form.value.priority,
        title:this.form.value.title
        //Document: this.form.value.docs
      }
      console.log(this.file);
      this.apiservice.upload(this.objdata).subscribe((event: any) => {
                if (typeof (event) === 'object') {  
                    this.shortLink = event.link;  
                    this.loading = false; 
                }
            }
        );
    }
}
