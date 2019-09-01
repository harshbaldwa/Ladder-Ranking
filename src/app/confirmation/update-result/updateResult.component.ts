import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LadderService } from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './updateResult.component.html',
  styleUrls: ['./updateResult.component.css']
})

export class UpdateResultComponent implements OnInit, OnDestroy {

  public matchId: string;
  public id: string;
  public matchScore: string;
  public setScore: string;
  public matchSwap: string;
  public setSwap: string;
  public p1: string;
  public player1 = true;

  constructor(public route: ActivatedRoute, public ladderService: LadderService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.matchId = paramMap.get('id');
      this.p1 = paramMap.get('p1');
    });
    this.id = localStorage.getItem('_id');
    if (this.p1 === 'false') {
      this.player1 = false;
    }
  }

  updateScore(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const swappedSet = [];
    this.matchSwap = form.value.matchScore;
    this.setSwap = form.value.setScore;
    if (!this.player1) {
      this.matchSwap = form.value.matchScore.split('-').reverse().join('-');
      for (const data of form.value.setScore.split(' ')) {
        const data1 = data.split('-').reverse().join('-');
        swappedSet.push(data1);
      }
      this.setSwap = swappedSet.join(' ');
    }

    this.ladderService.updateScore(
      this.id,
      this.matchId,
      this.matchSwap,
      this.setSwap
    );
    this.ladderService.updatedResult(this.router);
  }

  ngOnDestroy() {
  }
}
