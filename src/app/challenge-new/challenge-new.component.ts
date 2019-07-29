import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-challenge-new',
  templateUrl: './challenge-new.component.html',
  styleUrls: ['./challenge-new.component.css']
})

export class ChallengeNewComponent implements OnInit, OnDestroy {

  id: string;
  name: string;
  sport: string;

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
      this.name = paramMap.get('name');
    });
    this.sport = localStorage.getItem('sport');
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
    const challenge = {
      challengeId: 'sdjbsKSUDnaenkcwu09324jsbc',
      challengerId: this.id,
      sport: this.sport,
      date: form.value.date,
      time: form.value.time,
      message: form.value.message
    };

  }

  ngOnDestroy() {
  }
}
