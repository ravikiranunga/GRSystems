import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { DataService } from 'src/app/services/data.service';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { finalize, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component(
  {
    selector: 'app-users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['./users-new.component.scss']
  })
export class UsersNewComponent implements OnInit {
  form: FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];

  constructor(private dialog: NgbActiveModal, private dataService: DataService,private apiservice:ApiServiceService,
    private toastr:ToastrService) {
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;
  }

  ngOnInit(): void {
    this.form = new FormGroup
      ({
        Category: new FormControl(null, Validators.required),       
        EmployeeId: new FormControl(null, Validators.required),
        Employee_Name: new FormControl(null, Validators.required),
        Email: new FormControl(null, Validators.required),
        UserName: new FormControl(null, Validators.required),
        Password: new FormControl(null, Validators.required)
      });
  }

  onCancel() {
    this.dialog.close();
  }

  onSave() {
    let aa = this.form;
    this.CreateNewUser();
    this.dialog.close();
  }
  CreateNewUser(){    
    const obj = {   
      Category:this.form.value.Category ,     
      EmployeeId:this.form.value.EmployeeId,  
      Employee_Name: this.form.value.Employee_Name,
      Email: this.form.value.Email,
      UserName: this.form.value.UserName,
      Password: this.form.value.Password
    }
    console.log(obj);    
    this.apiservice.CreateNewUser(obj).subscribe((response: any)=> {
      console.log(response);
      this.toastr.success('User created successfully!','Success');
    });
  }
}
