import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Confirmations } from './confirmation.model';
import { LadderService } from '../../app.service';

@Component({
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})

export class ConfirmationComponent implements OnInit, OnDestroy{

  confirmations: Confirmations[] = [];
  private confirmSub: Subscription;

  constructor(public ladderService: LadderService) { }

  ngOnInit() {
    this.ladderService.getConfirmations();
    this.confirmSub = this.ladderService.getConfirmationsUpdateListener()
      .subscribe((confirmations: Confirmations[]) => {
        this.confirmations = confirmations;
      });
  }

  ngOnDestroy() {
    this.confirmSub.unsubscribe();
  }
}
