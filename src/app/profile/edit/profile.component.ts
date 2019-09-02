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


  constructor(public service: LadderService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.service.getProfile(localStorage.getItem('_id'));
    this.profileUpdate = this.service.getProfileUpdateListener()
      .subscribe((data) => {
        this.profile = data;
        this.gender = this.profile.gender;
        this.sport = this.profile.preferred;
        this.hostel = this.profile.hostel;
        this.name = this.profile.name;
        this.contact = this.profile.contact;
      });
  }

  changeProfile(form: NgForm) {
    let sports = '';
    for (const sport of this.sport) {
      sports = sport + ',' + sports;
    }
    if (form.invalid) {
      return;
    }
    console.log(form);
    this.service.changeProfile(
      this.profile.id,
      form.value.name,
      form.value.hostel,
      form.value.gender,
      sports,
      form.value.contact
    );
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open('Changed Successfully', 'OK!', { duration: 2000 });
  }
}
