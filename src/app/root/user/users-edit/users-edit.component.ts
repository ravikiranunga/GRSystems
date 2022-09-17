import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemeService } from 'ng2-charts';
import { Category } from 'src/app/models/category.model';
import { DataService } from 'src/app/services/data.service';

@Component(
{
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit
{
  @Input() user:any;

  form:FormGroup;
  statusList: string[];
  priorityList: string[];
  categoryList: Category[];

  constructor(private dialog: NgbActiveModal, private dataService:DataService)
  {
    this.statusList = dataService.STATUS_DATA;
    this.priorityList = dataService.PRIORITY_DATA;
    this.categoryList = dataService.CATEGORY_DATA;
  }

  ngOnInit(): void
  {
    this.form = new FormGroup
    ({
        empid: new FormControl(this.user.employeeId, Validators.required),
        name: new FormControl(this.user.name, Validators.required),
        email: new FormControl(this.user.email, Validators.required),
        username: new FormControl(this.user.userName, Validators.required),
        password: new FormControl(this.user.password, Validators.required),
        category: new FormControl(this.user.department, Validators.required),
        docs: new FormControl(),
    });

    console.log(this.user.department);

  }

  onCancel()
  {
    this.dialog.close();
  }

  onSave()
  {
    this.dialog.close();
  }
}
