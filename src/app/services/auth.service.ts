import { Injectable } from '@angular/core';
import * as moment from "moment";
import { Observable, pipe } from 'rxjs';
import { User } from '../models/user.model';
import {finalize, shareReplay } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authHeader = new HttpHeaders({ 'Content-Type': "application/Json; charset=utf-8", });
  constructor(private httpClient: HttpClient) { }

  // login(login:any): Observable<any[]> {

  //     return this.httpClient.post<any[]>(environment.baseUrl + 'Login', JSON.stringify(login), { headers: this.authHeader });

  // }
  

  setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiration, 'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("role", authResult.role)
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("role");
  }
   isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || '{}');
    return moment(expiresAt);
  }
}
