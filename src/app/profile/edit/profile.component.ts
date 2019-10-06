import { Component, OnInit } from '@angular/core';
import { LadderService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  public profileUpdate: Subscription;
  public profile: any = {};
  public hostel = '';
  public gender = '';
  public sport = '';
  public name = '';
  public contact = '';
  public categorySquash = '';
  public categoryTT = '';
  public categoryTennis = '';
  public categoryBadminton = '';

  constructor(public service: LadderService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.service.getProfile(localStorage.getItem('_id'));
    this.profileUpdate = this.service.getProfileUpdateListener()
      .subscribe((data) => {
        this.profile = data;
        this.gender = this.profile.gender;
        this.sport = this.profile.preferred.split(',');
        this.hostel = this.profile.hostel;
        this.name = this.profile.name;
        this.contact = this.profile.contact;
        this.categorySquash = this.profile.categorySquash;
        this.categoryTT = this.profile.categoryTT;
        this.categoryTennis = this.profile.categoryTennis;
        this.categoryBadminton = this.profile.categoryBadminton;
      });
  }

  changeProfile(form: NgForm) {
    let sportttr = '';
    for (const sport of this.sport) {
      sportttr = sport + ',' + sportttr;
    }
    if (form.invalid) {
      return;
    }

    this.service.changeProfile(
      this.profile.id,
      form.value.name,
      form.value.hostel,
      form.value.gender,
      sportttr,
      this.categorySquash,
      this.categoryTT,
      this.categoryTennis,
      this.categoryBadminton,
      form.value.contact
    );
  }
}
