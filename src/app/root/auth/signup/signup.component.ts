import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component(
{
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit
{
  form:FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];

  constructor(private dialog: NgbActiveModal, private dataService:DataService,private apiservice:ApiServiceService,
    private toastr:ToastrService)
  {
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;
  }

  ngOnInit(): void
  {
    this.form = new FormGroup
    ({
        EmployeeId: new FormControl(null, Validators.required),
        Employee_Name: new FormControl(null, Validators.required),
        UserName: new FormControl(null, Validators.required),
        Password: new FormControl(null, Validators.required),
        PasswordConfirmation: new FormControl(null, Validators.required),
        SecurityQuestion: new FormControl(null, Validators.required),
        Answer: new FormControl(null, Validators.required),
        docs: new FormControl(),
    });
  }

  onCancel()
  {
    this.dialog.close();
  }

  onSave()
  {
    let aa = this.form  
    this.SignUp();
    this.dialog.close();
  }
  SignUp(){   
    const obj = {    
      EmployeeId: this.form.value.EmployeeId, 
      Employee_Name: this.form.value.Employee_Name,
      UserName: this.form.value.UserName,
      Password: this.form.value.Password,
      PasswordConfirmation: this.form.value.PasswordConfirmation,
      SecurityQuestion:this.form.value.SecurityQuestion,
      Answer:this.form.value.Answer,
    }
    console.log(obj);    
    this.apiservice.Register(obj).subscribe((response: any)=> {
      console.log(response);
      this.toastr.success('Account created successfully!','Success');
    });
  }
}
