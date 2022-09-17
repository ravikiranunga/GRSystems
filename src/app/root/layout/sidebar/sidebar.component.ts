import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  role:any;
  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    console.log(localStorage.getItem("role"));
  }

}
