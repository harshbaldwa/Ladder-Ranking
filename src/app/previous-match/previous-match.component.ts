import { Component, OnInit, OnDestroy } from '@angular/core';
import { LadderService } from '../app.service';
import { Subscription } from 'rxjs';
import { PreviousMatch } from './previous_match.model';

@Component({
  templateUrl: './previous-match.component.html',
  styleUrls: ['./previous-match.component.css']
})

export class PreviousMatchComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['date', 'player', 'result'];
  public id = localStorage.getItem('_id');
  public previousMatches: PreviousMatch[];
  public previousSub: Subscription;
  constructor(public ladderService: LadderService) {}

  ngOnInit() {
    this.ladderService.getPreviousMatchResult(this.id);
    this.previousSub = this.ladderService.getPreviousUpdateListener()
    .subscribe((matches: PreviousMatch[]) => {
        this.previousMatches = matches;
        for (const entry of this.previousMatches) {
          const finalSetScore = entry.set_score.split(' ').join(' | ');
          entry.set_score = finalSetScore;

          if (entry.p1_id === this.id) {
            entry.p1_yes = true;

          } else {
            entry.p1_yes = false;
          }
        }
    });
  }

  ngOnDestroy() {
    this.previousSub.unsubscribe();
  }
}
