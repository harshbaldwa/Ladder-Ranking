import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {



  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.authService.createUser(form.value.name, form.value.roll, form.value.hostel, form.value.gender, form.value.category, form.value.preferred, form.value.contact , form.value.password);
  }
}
