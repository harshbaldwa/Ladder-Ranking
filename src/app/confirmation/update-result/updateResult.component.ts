import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LadderService } from 'src/app/app.service';


@Component({
  templateUrl: './updateResult.component.html',
  styleUrls: ['./updateResult.component.css']
})

export class UpdateResultComponent implements OnInit, OnDestroy {

  public matchId: string;
  public id: string;
  public sport: string;
  public matchScore: string;
  public setScore: string;
  public matchSwap: string;
  public setSwap: string;
  public p1: string;
  public player1 = true;
  public valid1 = true;
  public valid2 = true;
  public valid3 = true;

  constructor(public route: ActivatedRoute, public ladderService: LadderService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.matchId = paramMap.get('id');
      this.p1 = paramMap.get('p1');
      this.sport = paramMap.get('sport');
    });
    this.id = localStorage.getItem('_id');
    if (this.p1 === 'false') {
      this.player1 = false;
    }
  }

  updateScore(form: NgForm) {

    this.valid1 = true;
    this.valid2 = true;
    this.valid3 = true;

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

    for (const a of this.matchSwap.split('-')) {
      if (!(a.charCodeAt(0) <= 57 && a.charCodeAt(0) >= 48)) {
        this.valid1 = false;
      }
    }

    if (!this.valid1) {
      return;
    }

    for (const a of this.setSwap.split(' ')) {
      for (const b of a.split('-')) {
        if (!(b.charCodeAt(0) <= 57 && b.charCodeAt(0) >= 48)) {
          this.valid2 = false;
        }
      }
    }

    if (!this.valid2) {
      return;
    }

    const count1 = this.matchSwap.split('-')[0].charCodeAt(0) - this.matchSwap.split('-')[1].charCodeAt(0);
    let count2 = 0;

    for (const a of this.setSwap.split(' ')) {
      if (Number(a.split('-')[0]) > Number(a.split('-')[1])) {
        count2 = count2 + 1;
      } else if (Number(a.split('-')[0]) < Number(a.split('-')[1])) {
        count2 = count2 - 1;
      }
    }

    if (count1 !== count2) {
      this.valid3 = false;
    }

    if (!this.valid3) {
      return;
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
