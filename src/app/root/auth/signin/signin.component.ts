import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResetComponent } from '../reset/reset.component';
import { SignupComponent } from '../signup/signup.component';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  
  constructor(private router: Router, private modalService: NgbModal, private apiservice: ApiServiceService,
     private toastr: ToastrService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [Validators.required])
    }
    );

  }

  onLogin() {
    this.Login();
    // this.router.navigate(['/root/sadmindashboard/']);
  }

  showSignup() {
    const dialog = this.modalService.open(SignupComponent);
  }

  showReset() {
    const dialog = this.modalService.open(ResetComponent);
  }
  Login() {
    const cred = {
      "UserName": this.form.value.UserName,
      "Password": this.form.value.Password
    }
    this.apiservice.Login(cred).subscribe((response: any) => {     
      
      this.authService.setSession(response);
      localStorage.setItem("UserName",this.form.value.UserName);
      if (response.role.includes('Admin')) {        
        this.router.navigate(['/root/sadmindashboard/']);        
      }
      if (response.role.includes('SAdmin')) {
        this.router.navigate(['/root/sadmindashboard/']);
      }
      if (response.role.includes('User')) {
        this.router.navigate(['/root/tickets/']);
      }
     
      if (response.HttpErrorResponse) {
        // console.log("error");
        this.toastr.error('Wrong Username/password');
      }

    });
  }
}