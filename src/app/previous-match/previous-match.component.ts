import { Component, OnInit, OnDestroy } from '@angular/core';
import { LadderService } from '../app.service';
import { Subscription, timer } from 'rxjs';
import { PreviousMatch } from './previous_match.model';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './previous-match.component.html',
  styleUrls: ['./previous-match.component.css']
})

export class PreviousMatchComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['date', 'player', 'result'];
  public id = localStorage.getItem('_id');
  public previousMatches: PreviousMatch[];
  private refresher: Subscription;
  public previousSub: Subscription;

  constructor(public ladderService: LadderService, private titleService: Title) {
    this.titleService.setTitle('Recent Matches | Ladder Ranking');
  }

  ngOnInit() {
    this.refresher = timer(0, 10000)
      .subscribe(data => {
        this.ladderService.getPreviousMatchResult(this.id);
      });
    this.previousSub = this.ladderService.getPreviousUpdateListener()
    .subscribe((matches: PreviousMatch[]) => {
        this.previousMatches = matches;
        for (const entry of this.previousMatches) {
          const finalSetScore = entry.set_score.split(' ').join(' | ');
          entry.set_score = finalSetScore;
          switch (entry.sport) {
            case 'squash':
              entry.sport = 'Squash';
              break;
            case 'tt':
              entry.sport = 'Table Tennis';
              break;
            case 'tennis':
              entry.sport = 'Lawn Tennis';
              break;
            case 'badminton':
              entry.sport = 'Badminton';
              break;
            case 'fifa':
              entry.sport = 'FIFA';
              break;
            default:
              break;
          }
          if (entry.p1_id === this.id) {
            entry.p1_yes = true;
          } else {
            entry.p1_yes = false;
            const yellow = [];
            for (const data of finalSetScore.split(' | ')) {
              yellow.push(data.split('-').reverse().join('-'));
            }
            entry.set_score = yellow.join(' | ');
            entry.match_score = entry.match_score.split('-').reverse().join('-');
          }
        }
    });
  }

  secyDispute(matchId: string, p1Yes: boolean) {
    let p1 = '';

    if (p1Yes) {
      p1 = 'p1';
    } else {
      p1 = 'p2';
    }

    this.ladderService.secy(matchId, p1);
  }

  ngOnDestroy() {
    this.previousSub.unsubscribe();
    this.refresher.unsubscribe();
  }
}
