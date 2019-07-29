import { Component, OnInit, OnDestroy } from '@angular/core';
import { Challenges } from './challenges.model';
import { LadderService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})

export class ChallengeListComponent implements OnInit, OnDestroy {
  challengesR: Challenges[] = [];
  private challengesSub: Subscription;

  constructor(public ladderService: LadderService) {}

  ngOnInit() {
    this.ladderService.getChallenges();
    this.challengesSub = this.ladderService.getChallengesUpdateListener()
     .subscribe((challenges: Challenges[]) => {
       this.challengesR = challenges;
     });
  }

  ngOnDestroy() {
    this.challengesSub.unsubscribe();
  }
}
