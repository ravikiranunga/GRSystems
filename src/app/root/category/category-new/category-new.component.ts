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
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit
{
  form:FormGroup;

  constructor(private dialog: NgbActiveModal, private dataService:DataService,private apiservice: ApiServiceService,
    private toastr: ToastrService)
  {
  }

  ngOnInit(): void
  {
    this.form = new FormGroup
    ({
      name: new FormControl(null, Validators.required),
        Description: new FormControl(null, Validators.required),
        L1_Escalation_User: new FormControl(null, Validators.required),
        L1_Duration_In_Hours: new FormControl(null, Validators.required),
        L2_Escalation_User: new FormControl(null, Validators.required),
        L2_Duration_In_Hours: new FormControl(null, Validators.required),
        L3_Escalation_User: new FormControl(null, Validators.required),
        L3_Duration_In_Hours: new FormControl(null, Validators.required),
    });
  }

  onCancel()
  {    
    this.dialog.close();
  }

  onSave()
  {
    let aa = this.form  
    this.PostCatagory();
    this.dialog.close();
  }
  PostCatagory(){    
    const obj = {     
      name: this.form.value.name,
      Description: this.form.value.Description,
      L1_Escalation_User: this.form.value.L1_Escalation_User,
      L1_Duration_In_Hours: this.form.value.L1_Duration_In_Hours,
      L2_Escalation_User:this.form.value.L2_Escalation_User,
      L2_Duration_In_Hours:this.form.value.L2_Duration_In_Hours,
      L3_Escalation_User:this.form.value.L3_Escalation_User,
      L3_Duration_In_Hours:this.form.value.L3_Duration_In_Hours,
    }
    console.log(obj);
    
    this.apiservice.PostDepartments(obj).subscribe((response: any)=> {
      console.log(response);
      this.toastr.success('Catagory created successfully!','Success');
    });
  }
}
