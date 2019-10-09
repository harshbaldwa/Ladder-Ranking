import { Component, OnInit, OnDestroy } from '@angular/core';
import { LadderService } from 'src/app/app.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
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
  public rankSquash: Subscription;
  public rankTT: Subscription;
  public rankTennis: Subscription;
  public rankBadminton: Subscription;
  public rankSquash1 = 0;
  public rankTT1 = 0;
  public rankTennis1 = 0 ;
  public rankBadminton1 = 0;

  constructor(public service: LadderService, private snackBar: MatSnackBar, private titleService: Title) {
    this.titleService.setTitle('Profile | Ladder Ranking');
  }

  ngOnInit() {
    this.service.getSquashRankLadder(localStorage.getItem('_id'));
    this.service.getTTRankLadder(localStorage.getItem('_id'));
    this.service.getTennisRankLadder(localStorage.getItem('_id'));
    this.service.getBadmintonRankLadder(localStorage.getItem('_id'));
    this.rankSquash = this.service.squashRankListener()
      .subscribe(data => {
        this.rankSquash1 = data;
      });
    this.rankTT = this.service.ttRankListener()
      .subscribe(data => {
        this.rankTT1 = data;
      });
    this.rankTennis = this.service.tennisRankListener()
      .subscribe(data => {
        this.rankTennis1 = data;
      });
    this.rankBadminton = this.service.badmintonRankListener()
      .subscribe(data => {
        this.rankBadminton1 = data;
      });
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

  ngOnDestroy() {
    this.rankBadminton.unsubscribe();
    this.rankSquash.unsubscribe();
    this.rankTT.unsubscribe();
    this.rankTennis.unsubscribe();
  }

}
