import { Component, OnInit, OnDestroy } from '@angular/core';
import { Challenges } from './challenges.model';
import { LadderService } from '../app.service';
import { Subscription, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.css']
})

export class ChallengeListComponent implements OnInit, OnDestroy {
  challengesR: Challenges[] = [];
  challengesS: Challenges[] = [];
  private challengesSubR: Subscription;
  private challengesSubS: Subscription;
  public id = localStorage.getItem('_id');

  constructor(public ladderService: LadderService) {}

  ngOnInit() {
    this.ladderService.getChallengesR(this.id);
    this.ladderService.getChallengesS(this.id);
    this.challengesSubR = this.ladderService.getChallengesRUpdateListener()
     .subscribe((challenges: Challenges[]) => {
      for (const challenge of challenges) {
        switch (challenge.sport) {
          case 'squash':
            challenge.sport = 'Squash';
            break;
          case 'tt':
            challenge.sport = 'Table Tennis';
            break;
          case 'tennis':
            challenge.sport = 'Lawn Tennis';
            break;
          case 'badminton':
            challenge.sport = 'Badminton';
            break;
          default:
            break;
        }
      }
      this.challengesR = challenges;
     });
    this.challengesSubS = this.ladderService.getChallengesSUpdateListener()
      .subscribe((challenges: Challenges[]) => {
        for (const challenge of challenges) {
          switch (challenge.sport) {
            case 'squash':
              challenge.sport = 'Squash';
              break;
            case 'tt':
              challenge.sport = 'Table Tennis';
              break;
            case 'tennis':
              challenge.sport = 'Lawn Tennis';
              break;
            case 'badminton':
              challenge.sport = 'Badminton';
              break;
            default:
              break;
          }
        }
        this.challengesS = challenges;
      });
  }

  onDeleteR(id: string) {
    this.ladderService.deleteChallengeR(id);
    this.ladderService.openSnackBar('Challenge Declined!', 'OK');
  }

  onDeleteS(id: string) {
    this.ladderService.deleteChallengeS(id);
    this.ladderService.openSnackBar('Challenge Deleted!', 'OK');
  }

  onConfirmChallenge(id: string) {
    this.ladderService.confirmChallenge(id);
    this.ladderService.openSnackBar('Challenge Confirmed!', 'OK');
  }

  onBothConfirm(id: string) {
    this.ladderService.updateChallenge(id);
    this.ladderService.openSnackBar('Challenge Confirmed!', 'OK');
  }

  ngOnDestroy() {
    this.challengesSubR.unsubscribe();
    this.challengesSubS.unsubscribe();
  }
}
