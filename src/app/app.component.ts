import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LadderService } from './app.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ladder-ranking';
  private notifN: Subscription;
  private notifC: Subscription;
  private notifP: Subscription;
  private authSub: Subscription;
  public id: string;

  constructor( private authService: AuthService, private ladderService: LadderService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.id = localStorage.getItem('_id');
    this.notifN = timer(1000, 5000)
      .subscribe(data => {
        this.ladderService.getNumberChallenge(this.id);
      });
    this.notifC = timer(1000, 5000)
      .subscribe(data => {
        this.ladderService.getNumberConfirmations(this.id);
      });
    this.notifP = timer(1000, 5000)
      .subscribe(data => {
        this.ladderService.getNumberPrevious(this.id);
      });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
