import { Component, OnInit } from '@angular/core';
import { LadderService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isMobile = ( window.innerWidth < 960 );
  notifications = '0';
  private challengesN: Subscription;

  constructor(public ladderService: LadderService) {}

  ngOnInit() {
    this.ladderService.getNumberChallenge(localStorage.getItem('_id'));
    this.challengesN = this.ladderService.getChallengesNUpdateListener()
      .subscribe((notifications) => {
        this.notifications = notifications;
      });

    if (Number(this.notifications) >= 100) {
      this.notifications = '99+';
    }
  }

}
