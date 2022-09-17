
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from '../user/user-profile/user-profile.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
dropEnabled:boolean=false;

  constructor(private apiService:ApiServiceService, private router : Router, private modalService:NgbModal,
    private auth:AuthService) { }

  ngOnInit(): void {
    // this.Logout();

  }
  dropDown(){
    this.dropEnabled = this.dropEnabled==true? false:true;
  }

  Logout(){
    this.apiService.Logout().subscribe((response : any) => {
      console.log(response);
      this.router.navigate(['/signin']);      
    })
    this.auth.logout();
  }
  getUserProfile(){
    this.modalService.open(UserProfileComponent);
  }

}

