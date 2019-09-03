import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private wrongCredential = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getCorrectCredential() {
    return this.wrongCredential.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(
    name: string,
    roll: string,
    hostel: string,
    gender: string,
    category: string,
    preferred: string,
    contact: string,
    password: string) {
    const authData: AuthData = {name, roll, hostel, gender, category, preferred, contact, password};
    this.http.post(environment.apiUrl + 'signup', authData)
      .subscribe();
    this.snackBar('Successfully signed up!', 'OK')
    this.router.navigate(['/login']);
  }

  login(roll: string, password: string) {
    const authData = {roll, password};
    this.http.post<{token: string, id: string, name: string, sport: string}>(environment.apiUrl + 'login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          response.sport = response.sport.split(',')[0];
          localStorage.setItem('_id', response.id);
          localStorage.setItem('name', response.name);
          localStorage.setItem('sport', response.sport);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.wrongCredential.next(false);
          this.saveAuthData(token);
          this.snackBar('Successfully logged in!', 'OK')
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
        this.wrongCredential.next(true);
      });
  }

  autoAuthUser() {
    const information = this.getAuthData();
    if (!information) {
      return;
    }
    this.token = information;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.snackBar('Successfully logged out!', 'OK')
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    localStorage.removeItem('name');
  }

  private getAuthData() {
    return localStorage.getItem('token');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

}
