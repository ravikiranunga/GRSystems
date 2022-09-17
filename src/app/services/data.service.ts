import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Ticket } from '../models/ticket.model';
import { User } from '../models/user.model';
import { ApiServiceService } from './api-service.service';

@Injectable(
{
  providedIn: 'root'
})
export class DataService
{
  editTicketData:Ticket;
  ELEMENT_DATA: Ticket[] = 
  [    
  ];

  CHANGE_DATA: any[] = 
  [
    // {date:'08/08/2022', title:'Created', comment:''},
    // {date:'08/08/2022', title:'Assigned', comment:''},
    // {date:'08/08/2022', title:'Escalated to Level 1', comment:''},
    // {date:'08/08/2022', title:'Escalated to Level 2', comment:''},
    // {date:'08/08/2022', title:'Escalated to Level 3', comment:''},
    // {date:'08/08/2022', title:'Closed', comment:''},
  ];

  USER_DATA: User[] = 
  [
    
  ];

  CATEGORY_DATA: Category[] = 
  [
    
  ];

  PRIORITY_DATA: any[] = 
  [
    'Low-Priority', 'Medium-Priority', 'High-Priority'
  ]

  STATUS_DATA: any[] = 
  [
    // 'Open', 'In Progress', 'Rejected', 'Closed'
    'Pending at admin','Pending at Super Admin','Closed'
  ]
  
  EditTicketData(ticket:Ticket){
    this.editTicketData = ticket;
  }
  constructor(private apiService:ApiServiceService,private httpClient:HttpClient) { }

}
