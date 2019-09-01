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

  private challengesP: number;
  private challengesUpdatesP = new Subject<number>();

  private challengesC: number;
  private challengesUpdatesC = new Subject<number>();


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

  private player1: boolean;
  private player1Sub = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

// Notifications
  getNumberChallenge(id: string) {
    const myId = { id };
    this.http.post<string>('http://localhost:3000/api/challengesN', myId)
      .subscribe((notification) => {
        this.challengesN = Number(notification);
        this.challengesUpdatesN.next(this.challengesN);
      });
  }

  getChallengesNUpdateListener() {
    return this.challengesUpdatesN.asObservable();
  }

  getNumberPrevious(id: string) {
    const myId = { id };
    this.http.post<string>('http://localhost:3000/api/challengesP', myId)
      .subscribe((notification) => {
        this.challengesP = Number(notification);
        this.challengesUpdatesP.next(this.challengesP);
      });
  }

  getChallengesPUpdateListener() {
    return this.challengesUpdatesP.asObservable();
  }

  getNumberConfirmations(id: string) {
    const myId = { id };
    this.http.post<string>('http://localhost:3000/api/challengesC', myId)
      .subscribe((notification) => {
        this.challengesC = Number(notification);
        this.challengesUpdatesC.next(this.challengesC);
      });
  }

  getChallengesCUpdateListener() {
    return this.challengesUpdatesC.asObservable();
  }

// Getting Ladder from server
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

// Adding a new challenge to the database
  addChallenge(
    p1Id: string,
    p2Id: string,
    p1Name: string,
    p2Name: string,
    sport: string,
    date: string,
    time: string,
    message: string
    ) {
    const match: Match = {
      id: null,
      p1_id: p1Id,
      p2_id: p2Id,
      p1_name: p1Name,
      p2_name: p2Name,
      sport,
      message,
      date,
      time,
      rejected: false
    };
    this.http.post<{}>('http://localhost:3000/api/addMatch', match)
      .subscribe(() => {
        this.getNumberChallenge(p2Id);
      });
  }

// Getting challenges sent or received

  getChallengesR(id: string) {
    const myId = { id };
    this.http.post<Challenges[]>('http://localhost:3000/api/challengesR', myId)
     .subscribe((challengeData) => {
      this.challengesR =  challengeData;
      this.challengesUpdatesR.next([...this.challengesR]);
     });
  }

  getChallengesRUpdateListener() {
    return this.challengesUpdatesR.asObservable();
  }

  getChallengesS(id: string) {
    const myId = { id };
    this.http.post<Challenges[]>('http://localhost:3000/api/challengesS', myId)
      .subscribe((challengeData) => {
        this.challengesS = challengeData;
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

  getChallengesSUpdateListener() {
    return this.challengesUpdatesS.asObservable();
  }

// Accepting Received Challenge
  confirmChallenge(id: string) {
    const myId = { id };
    this.http.post('http://localhost:3000/api/confirmChallenge/', myId)
      .subscribe((result) => {
        const updatedChallenges = this.challengesR.filter(challenge => challenge._id !== id);
        this.challengesR = updatedChallenges;
        this.getNumberChallenge(id);
        this.challengesUpdatesR.next([...this.challengesR]);
      });
  }

// Rejecting Received Challenge
  deleteChallengeR(id: string) {
    this.http.get('http://localhost:3000/api/matches/R/' + id)
      .subscribe(() => {
        const updatedChallenges = this.challengesR.filter(challenge => challenge._id !== id);
        this.challengesR = updatedChallenges;
        this.getNumberChallenge(id);
        this.challengesUpdatesR.next([...this.challengesR]);
      });
  }

// Deleting Sent Challenge
  deleteChallengeS(id: string) {
    this.http.delete('http://localhost:3000/api/matches/' + id)
      .subscribe(() => {
        const updatedChallenges = this.challengesS.filter(challenge => challenge._id !== id);
        this.challengesS = updatedChallenges;
        this.getNumberChallenge(id);
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

// Confirming the accepted or rejected challenge
  updateChallenge(id: string) {
    const myId = { id };
    this.http.post('http://localhost:3000/api/confirmOk/', myId)
      .subscribe((result) => {
        const updatedChallenges = this.challengesS.filter(challenge => challenge._id !== id);
        this.challengesS = updatedChallenges;
        this.getNumberChallenge(id);
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

// Previous Match results
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

// Updating the score
  updateScore(id: string, matchId: string, matchScore: string, setScore: string) {
    const data = { id, matchId, matchScore, setScore };
    this.http.post('http://localhost:3000/api/updateScore', data)
      .subscribe((result) => {
      });
  }

// SnackBar after updating result
  updatedResult(router: Router) {
    router.navigate(['/previous']);
    this.openSnackBar('Awaiting Confirmation!', 'OK!');
  }

// Profile Setup
  getProfile(id: string) {
    const data = { id };
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
    this.http.post('http://localhost:3000/api/profileUpdate/', data)
      .subscribe();
  }

// Getting Confirmations
  getConfirmations(id: string) {
    const myId = { id };
    this.http.post<Confirmations[]>('http://localhost:3000/api/confirmations', myId)
      .subscribe((confirmationData) => {
        this.confirmations = confirmationData;
        this.confirmationsUpdates.next([...this.confirmations]);
      });
  }

  getConfirmationsUpdateListener() {
    return this.confirmationsUpdates.asObservable();
  }

// Rejecting the confirmation
  rejectFinalResult(matchId: string) {
    const data = { matchId };
    this.http.post('http://localhost:3000/api/finalReject', data)
      .subscribe(result => {
        const updatedConfirmations = this.confirmations.filter(confirmation => confirmation._id !== matchId);
        this.confirmations = updatedConfirmations;
        this.confirmationsUpdates.next([...this.confirmations]);
      });
  }

// Accepting the confirmation

  setFinalResult(id: string, matchId: string, p1Yes: boolean) {
    const dataSend = { id, matchId, p1Yes };
    this.http.post('http://localhost:3000/api/finalResult', dataSend)
        .subscribe(data => {
          const updatedConfirmations = this.confirmations.filter(confirmation => confirmation._id !== matchId);
          this.confirmations = updatedConfirmations;
          this.confirmationsUpdates.next([...this.confirmations]);
          const dataset = { matchId };
          this.http.post('http://localhost:3000/api/calculate', dataset)
            .subscribe((body) => {
            });
        });
  }

// SnackBar for all!
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

}
