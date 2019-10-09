import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { LadderService } from '../app.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment';
import { Title } from '@angular/platform-browser';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD MM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-challenge-new',
  templateUrl: './challenge-new.component.html',
  styleUrls: ['./challenge-new.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class ChallengeNewComponent implements OnInit, OnDestroy {

  date = new FormControl();
  id: string;
  name: string;
  sport: string;
  sport1: string;
  minDate = new Date();

  constructor(public service: LadderService, public route: ActivatedRoute, private router: Router, private titleService: Title) {
    this.titleService.setTitle('New Challenge | Ladder Ranking');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.name = paramMap.get('name');
    });
    this.sport = localStorage.getItem('sport');
    this.sport1 = localStorage.getItem('sport');
    switch (this.sport) {
      case 'squash':
        this.sport = 'Squash';
        break;
      case 'tt':
        this.sport = 'Table Tennis';
        break;
      case 'tennis':
        this.sport = 'Lawn Tennis';
        break;
      case 'badminton':
        this.sport = 'Badminton';
        break;
      default:
        break;
    }
  }

  submitChallenge(form: NgForm) {
    if (form.invalid) {
      return;
    }
    let date = this.date.value._d.getDate();
    let month = String(Number(this.date.value._d.getMonth()) + 1);
    const year = this.date.value._d.getFullYear();

    if (Number(date) < 10) {
      date = '0' + date;
    }
    if (Number(month) < 10) {
      month = '0' + month;
    }

    const dateFinal = date + '/' + month + '/' + year;

    this.service.addChallenge(
      this.id,
      localStorage.getItem('_id'),
      this.name,
      localStorage.getItem('name'),
      this.sport1,
      dateFinal,
      form.value.time,
      form.value.message
    );
    this.router.navigate(['/challenges']);
  }

  ngOnDestroy() {
  }
}
