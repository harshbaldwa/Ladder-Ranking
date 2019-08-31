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
  public player1 = false;
  public player1Sub: Subscription;
  public matchSwap: string;
  public setSwap: string;

  constructor(public route: ActivatedRoute, public ladderService: LadderService, private router: Router) { }

  ngOnInit() {
    this.player1Sub = this.ladderService.getPlayer1UpdateListener()
      .subscribe((is1: boolean) => {
        this.player1 = is1;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.matchId = paramMap.get('id');
    });
    this.id = localStorage.getItem('_id');
  }

  updateScore(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.ladderService.isPlayer1(this.id, this.matchId);
    const swappedSet = [];
    this.matchSwap = form.value.matchScore;

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
    this.player1Sub.unsubscribe();
  }
}
