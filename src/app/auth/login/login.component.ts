import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  wrongcred = false;
  private wrongC: Subscription;
  private authSub: Subscription;

  constructor(public authService: AuthService, private titleService: Title) {
    this.titleService.setTitle('Login | Ladder Ranking');
  }

  ngOnInit() {
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(data => {
        this.isLoading = data;
      });

    this.wrongC = this.authService.getCorrectCredential()
      .subscribe(data => {
        this.wrongcred = data;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.roll, form.value.password);
  }

  ngOnDestroy() {
  this.authSub.unsubscribe();
  this.wrongC.unsubscribe();
  }
}
