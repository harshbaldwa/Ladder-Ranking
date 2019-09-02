import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public name: string;
  public roll: string;
  public hostel: string;
  public gender: string;
  public category: string;
  public preferred: string;
  public contact: number;
  public pass: string;

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    let sports = '';
    for (const sport of this.preferred) {
      sports = sport + ',' + sports;
    }
    if (form.invalid) {
      return;
    }
    this.authService.createUser(
      form.value.name,
      form.value.roll,
      form.value.hostel,
      form.value.gender,
      form.value.category,
      sports,
      form.value.contact,
      form.value.password
      );
  }
}
