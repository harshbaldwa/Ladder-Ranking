import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LadderRanking } from './ladder-table/ladder.model';
import { Challenges } from './challenge-list/challenges.model';
import { Match } from './challenge-new/match.model';
import { Confirmations } from './confirmation/confirm-result/confirmation.model';

@Injectable({providedIn: 'root'})

export class LadderService {

  private ladderTable: LadderRanking[] = [];
  private ladderUpdate = new Subject<LadderRanking[]>();

  private challengesR: Challenges[] = [];
  private challengesUpdatesR = new Subject<Challenges[]>();

  private challengesS: Challenges[] = [];
  private challengesUpdatesS = new Subject<Challenges[]>();

  private confirmations: Confirmations[] = [];
  private confirmationsUpdates = new Subject<Confirmations[]>();

  constructor(private http: HttpClient) {}

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

  getChallengesRUpdateListener() {
    return this.challengesUpdatesR.asObservable();
  }

  getChallengesSUpdateListener() {
    return this.challengesUpdatesS.asObservable();
  }

  deleteChallengeR(id: string) {
    this.http.delete('http://localhost:3000/api/matches/' + id)
      .subscribe(() => {
        const updatedChallenges = this.challengesR.filter(challenge => challenge._id !== id);
        this.challengesR = updatedChallenges;
        this.challengesUpdatesR.next([...this.challengesR]);
      });
  }

  deleteChallengeS(id: string) {
    this.http.delete('http://localhost:3000/api/matches/' + id)
      .subscribe(() => {
        const updatedChallenges = this.challengesS.filter(challenge => challenge._id !== id);
        this.challengesS = updatedChallenges;
        this.challengesUpdatesS.next([...this.challengesS]);
      });
  }

  getConfirmations() {
    this.http.get<Confirmations[]>('http://localhost:3000/api/confirmations')
      .subscribe((confirmationData) => {
        this.confirmations = confirmationData;
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
      time};
    this.http.post<{}>('http://localhost:3000/api/addMatch', match)
      .subscribe();
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

}
