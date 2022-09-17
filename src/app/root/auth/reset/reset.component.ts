import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component(
  {
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
  })
export class ResetComponent implements OnInit {
  state1: boolean = true;
  state2: boolean = false;
  state3: boolean = false;

  form: FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];

  constructor(private dialog: NgbActiveModal, private dataService: DataService, private apiservice: ApiServiceService,
    private toastr: ToastrService) {
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;
  }

  ngOnInit(): void {
    this.form = new FormGroup
      ({
        empid: new FormControl(null, Validators.required),
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        passwordConfirmation: new FormControl(null, Validators.required),
        question: new FormControl(null, Validators.required),
        answer: new FormControl(null, Validators.required)
      });
  }

  onCancel() {
    this.dialog.close();
  }

  onSave() {
    debugger
    let aa = this.form
    this.ResetPassword();
    this.dialog.close();
  }
  ResetPassword() {
    debugger
    const obj = {
      password: this.form.value.password,
      passwordConfirmation: this.form.value.passwordConfirmation
    }
    console.log(obj);
    this.apiservice.ResetPassword(obj).subscribe((response: any) => {
      console.log(response);
      this.toastr.success('Password Reset successfully!', 'Success')
    });
  }

  onNext() {
    this.state1 = true;
    this.state2 = true;
    this.state3 = false;
  }

  onValidate() {
    this.state1 = false;
    this.state2 = false;
    this.state3 = true;
  }
}
