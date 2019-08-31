import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LadderRanking } from './ladder-table/ladder.model';
import { Challenges } from './challenge-list/challenges.model';
import { Match } from './challenge-new/match.model';
import { PreviousMatch } from './previous-match/previous_match.model';
import { Confirmations } from './confirmation/confirm-result/confirmation.model';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})

export class LadderService {

  private ladderTable: LadderRanking[] = [];
  private ladderUpdate = new Subject<LadderRanking[]>();

  private challengesN: number;
  private challengesUpdatesN = new Subject<number>();

  private challengesR: Challenges[] = [];
  private challengesUpdatesR = new Subject<Challenges[]>();

  private challengesS: Challenges[] = [];
  private challengesUpdatesS = new Subject<Challenges[]>();

  private previousMatches: PreviousMatch[] = [];
  private previousMatchesUpdates = new Subject<PreviousMatch[]>();

  private confirmations: Confirmations[] = [];
  private confirmationsUpdates = new Subject<Confirmations[]>();

  private profileData: Profile;
  private profileUpdate = new Subject<Profile>();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  getChallengesR(id: string) {
    const myId = { id };
    this.http.post<Challenges[]>('http://localhost:3000/api/challengesR', myId)
     .subscribe((challengeData) => {
      this.challengesR =  challengeData;
      this.challengesUpdatesR.next([...this.challengesR]);
     });
  }
  getChallengesS(id: string) {
    const myId = { id };
    this.http.post<Challenges[]>('http://localhost:3000/api/challengesS', myId)
      .subscribe((challengeData) => {
        this.challengesS = challengeData;
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

  getChallengesNUpdateListener() {
    return this.challengesUpdatesN.asObservable();
  }

  getChallengesRUpdateListener() {
    return this.challengesUpdatesR.asObservable();
  }

  getChallengesSUpdateListener() {
    return this.challengesUpdatesS.asObservable();
  }

  deleteChallengeR(id: string) {
    this.http.get('http://localhost:3000/api/matches/R/' + id)
      .subscribe(() => {
        const updatedChallenges = this.challengesR.filter(challenge => challenge._id !== id);
        this.challengesR = updatedChallenges;
        this.challengesUpdatesN.next(this.challengesN - 1);
        this.challengesUpdatesR.next([...this.challengesR]);
      });
  }

  deleteChallengeS(id: string) {
    this.http.delete('http://localhost:3000/api/matches/' + id)
      .subscribe(() => {
        const updatedChallenges = this.challengesS.filter(challenge => challenge._id !== id);
        this.challengesS = updatedChallenges;
        this.challengesUpdatesN.next(this.challengesN - 1);
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

  getConfirmations(id: string) {
    const myId = { id };
    this.http.post<Confirmations[]>('http://localhost:3000/api/confirmations', myId)
      .subscribe((confirmationData) => {
        this.confirmations = confirmationData;
        this.confirmationsUpdates.next([...this.confirmations]);
      });
  }

  setFinalResult(id: string, matchId: string, p1Yes: boolean) {
    const dataSend = { id, matchId, p1Yes };
    this.http.post('http://localhost:3000/api/finalResult', dataSend)
        .subscribe(data => {
          const updatedConfirmations = this.confirmations.filter(confirmation => confirmation._id !== id);
          this.confirmations = updatedConfirmations;
          this.confirmationsUpdates.next([...this.confirmations]);
        });
  }

  getConfirmationsUpdateListener() {
    return this.confirmationsUpdates.asObservable();
  }

  // tslint:disable-next-line: variable-name
  addChallenge(p1_id: string, p2_id: string, p1_name: string, p2_name: string, sport: string, date: string, time: string, message: string) {
    const match: Match = {
      id: null,
      p1_id,
      p2_id,
      p1_name,
      p2_name,
      sport,
      message,
      date,
      time,
      rejected: false
    };
    this.http.post<{}>('http://localhost:3000/api/addMatch', match)
      .subscribe(() => {
        this.getNumberChallenge(localStorage.getItem('_id'));
      });
  }

  getNumberChallenge(id: string) {
    this.http.post<string>('http://localhost:3000/api/challengesN', id)
      .subscribe((notification) => {
        this.challengesN = Number(notification);
        this.challengesUpdatesN.next(this.challengesN);
      });
  }

  getLadder(sport: string) {
    this.http.get<LadderRanking[]>('http://localhost:3000/api/table/' + sport)
     .subscribe((ladderData) => {
       this.ladderTable = ladderData;
       this.ladderUpdate.next([...this.ladderTable]);
     });
  }

  getLadderUpdateListener() {
    return this.ladderUpdate.asObservable();
  }

  getProfile(id: string) {
    const data = {id};
    this.http.post<any>('http://localhost:3000/api/profile/', data)
      .subscribe((profileData) => {
        this.profileData = profileData;
        this.profileUpdate.next(this.profileData);
      });
  }

  getProfileUpdateListener() {
    return this.profileUpdate.asObservable();
  }

  changeProfile(id: string, name: string, hostel: string, gender: string, preferred: string, contact: string) {
    const data = {
      id,
      name,
      hostel,
      gender,
      preferred,
      contact
    };
    console.log(data);
    this.http.post('http://localhost:3000/api/profileUpdate/', data)
      .subscribe((result) => {
        console.log(result);
      });
  }

  confirmChallenge(id: string) {
    const myId = { id };
    this.http.post('http://localhost:3000/api/confirmChallenge/', myId)
      .subscribe((result) => {
        const updatedChallenges = this.challengesR.filter(challenge => challenge._id !== id);
        this.challengesR = updatedChallenges;
        this.challengesUpdatesN.next(this.challengesN - 1);
        this.challengesUpdatesR.next([...this.challengesR]);
      });
  }

  updateChallenge(id: string) {
    const myId = { id };
    this.http.post('http://localhost:3000/api/confirmOk/', myId)
      .subscribe((result) => {
        const updatedChallenges = this.challengesS.filter(challenge => challenge._id !== id);
        this.challengesS = updatedChallenges;
        this.challengesUpdatesN.next(this.challengesN - 1);
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

  updateScore(id: string, matchId: string, matchScore: string, setScore: string) {
    const data = { id, matchId, matchScore, setScore };
    this.http.post('http://localhost:3000/api/updateScore', data)
      .subscribe((result) => {
        console.log(result);
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  updatedResult(router: Router) {
    router.navigate(['/previous']);
    this.openSnackBar('Awaiting Confirmation!', 'OK!');
  }

  getPreviousMatchResult(id: string) {
    const myId = { id };

    this.http.post<PreviousMatch[]>('http://localhost:3000/api/previousMatch', myId)
      .subscribe((matchData) => {
        this.previousMatches = matchData;
        this.previousMatchesUpdates.next([...this.previousMatches]);
      });
  }

  getPreviousUpdateListener() {
    return this.previousMatchesUpdates.asObservable();
  }
}
