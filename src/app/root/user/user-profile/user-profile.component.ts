
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { ApiServiceService } from 'src/app/services/api-service.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  items: User[];
  selectedItem: User;
  headingEnable: boolean = true;
  editEnable: boolean = false;

  constructor(private dataService: DataService, private modalService: NgbModal, private apiservie: ApiServiceService) {

  }

  ngOnInit(): void {
    this.GetUserProfile();
  }

  GetUserProfile() {
    this.apiservie.GetUserProfile().subscribe((response: any) => {
      this.items = response;
      console.log(this.items);
    });
  }
  editClicked() {
    this.headingEnable = false;
    this.editEnable = true;
  }

  cancelClicked() {
    this.editEnable = false;
    this.headingEnable = true;
  }

  saveClicked() {
    this.editEnable = false;
    this.headingEnable = true;
  }
}