import { Component, OnInit, OnDestroy } from '@angular/core';
import { Challenges } from './challenges.model';
import { LadderService } from '../app.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})

export class ChallengeListComponent implements OnInit, OnDestroy {
  challengesR: Challenges[] = [];
  challengesS: Challenges[] = [];
  private challengesSub: Subscription;

  constructor(public ladderService: LadderService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.ladderService.getChallengesR(localStorage.getItem('_id'));
    this.ladderService.getChallengesS(localStorage.getItem('_id'));
    this.challengesSub = this.ladderService.getChallengesRUpdateListener()
     .subscribe((challenges: Challenges[]) => {
       this.challengesR = challenges;
     });
    this.challengesSub = this.ladderService.getChallengesSUpdateListener()
      .subscribe((challenges: Challenges[]) => {
        this.challengesS = challenges;
      });
  }

  onDeleteR(id: string) {
    this.ladderService.deleteChallengeR(id);
    this.openSnackBar('Challenge Declined!', 'OK!');
  }

  onDeleteS(id: string) {
    this.ladderService.deleteChallengeS(id);
    this.openSnackBar('Challenge Deleted!', 'OK!');
  }

  onConfirmChallenge(id: string) {
    this.ladderService.confirmChallenge(id);
    this.openSnackBar('Challenge Confirmed!', 'OK!');
  }

  onBothConfirm(id: string) {
    this.ladderService.updateChallenge(id);
    this.openSnackBar('Challenge Confirmed!', 'OK!');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  ngOnDestroy() {
    this.challengesSub.unsubscribe();
  }
}
