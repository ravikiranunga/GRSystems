import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Ticket } from '../models/ticket.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { SignUp } from '../models/signup.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  authHeader = new HttpHeaders({ 'Content-Type': "application/Json; charset=utf-8", });
  authHeaderS = new HttpHeaders({ 'Content-Type': "multipart/form-data;charset=utf-8", });
  ticket: any;
  constructor(private httpClient: HttpClient) { }

  GetRecentTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(environment.url + 'GetRecentTickets', { headers: this.authHeader });
  }
  GetAllTickets(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(environment.url + 'Gettbl_tickets', { headers: this.authHeader });
  }
  GetAllDepartments(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(environment.url + 'GetTicketsByDepartment', { headers: this.authHeader });
  }
  GetAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.url + 'GetTicketsByUser', { headers: this.authHeader });
  }
  Posttickets(ticket: any): Observable<Ticket[]> {
    debugger
    return this.httpClient.post<Ticket[]>(environment.url + 'Posttickets', JSON.stringify(ticket), { headers: this.authHeader })
  }

  PostDepartments(catagory: any): Observable<Category[]> {
    return this.httpClient.post<Category[]>(environment.url + 'PostDepartments', JSON.stringify(catagory), { headers: this.authHeader })
  }
  Register(signup: any): Observable<SignUp[]> {
    return this.httpClient.post<SignUp[]>(environment.baseUrl + 'CreateAccount', JSON.stringify(signup), { headers: this.authHeader })
  }
  CreateNewUser(users: any): Observable<User[]> {
    return this.httpClient.post<User[]>(environment.baseUrl + 'CreateNewUser', JSON.stringify(users), { headers: this.authHeader })
  }
  Login(login: any): Observable<any[]> {
    return this.httpClient.post<any[]>(environment.baseUrl + 'Login', JSON.stringify(login), { headers: this.authHeader })
  }
  // Logout(logout: any): Observable<any[]> {
  //   return this.httpClient.post<any[]>(environment.baseUrl + 'Logout', JSON.stringify(logout), { headers: this.authHeader })
  // }
  ResetPassword(resetpsw: any): Observable<any[]> {
    return this.httpClient.put<any[]>(environment.baseUrl + 'ResetPassword', JSON.stringify(resetpsw), { headers: this.authHeader })
  }
  // GetTicketsByFilter(filterData: any): Observable<any[]> {
  //   var paramss = new HttpParams().set('Department', filterData.Department).set('Priority', filterData.Priority).
  //     set('Status', filterData.Status);
  //   return this.httpClient.get<any>(environment.url + 'GetTicketsByFilte', { headers: this.authHeader, params: paramss });
  // }
  GetTicketsByFilters(): Observable<Ticket[]> {
    return this.httpClient.get<Ticket[]>(environment.url + 'GetTicketsByFilter', { headers: this.authHeader });
  }
  GetUserProfile(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.baseUrl + 'UserProfile', { headers: this.authHeader })
  }
  Logout(): Observable<SignUp[]> {
    return this.httpClient.post<SignUp[]>(environment.baseUrl + 'Logout', { headers: this.authHeader })
  }
  updateTicket(tickId: number): Observable<any[]> {
    var paramss = new HttpParams().set('ticketId', tickId)
    return this.httpClient.get<any[]>(environment.url + 'DeleteTicketById', { headers: this.authHeader, params: paramss })
  }
  deleteUserbyId(employeeId: number): Observable<any[]> {
    var paramss = new HttpParams().set('EmployeeId', employeeId)
    return this.httpClient.get<any[]>(environment.baseUrl + 'DeleteUserById', { headers: this.authHeader, params: paramss })
  }
  editTicketById(tickdet: any): Observable<any[]> {
    var paramss = new HttpParams().set('ticketId', tickdet.ticketId).set('Status', tickdet.status).set('Comment', tickdet.comment)
    return this.httpClient.get<any[]>(environment.url + 'EditTicketById', { headers: this.authHeader, params: paramss })
  }

  upload(ticket: any): Observable<any> {   
    return this.httpClient.post(environment.url + 'Posttickets', JSON.stringify(ticket), { headers: this.authHeader })
  }
  ticketByuser(userName:any){
    var paramss = new HttpParams().set('userName', userName);
    return this.httpClient.get<any[]>(environment.url + 'ticketByuser', { headers: this.authHeader,params:paramss });
  }
}