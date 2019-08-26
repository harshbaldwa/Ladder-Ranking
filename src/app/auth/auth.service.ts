import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(name: string, roll: string, hostel: string, gender: string, category: string, preferred: string, contact: string, password: string) {
    const authData: AuthData = {name, roll, hostel, gender, category, preferred, contact, password};
    this.http.post('http://localhost:3000/api/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(roll: string, password: string) {
    const authData = {roll, password};
    this.http.post('http://localhost:3000/api/login', authData)
      .subscribe(response => {
        console.log(response);
      });
  }
}