import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LadderService } from 'src/app/app.service';

@Component({
  templateUrl: './updateResult.component.html',
  styleUrls: ['./updateResult.component.css']
})

export class UpdateResultComponent implements OnInit {

  public matchId: string;
  public id: string;
  public matchScore: string;
  public setScore: string;

  constructor(public route: ActivatedRoute, public ladderService: LadderService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.matchId = paramMap.get('id');
    });
    this.id = localStorage.getItem('_id');
  }

  updateScore(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.ladderService.updateScore(
      this.id,
      this.matchId,
      form.value.matchScore,
      form.value.setScore,
    );
    this.ladderService.updatedResult(this.router);
  }
}
