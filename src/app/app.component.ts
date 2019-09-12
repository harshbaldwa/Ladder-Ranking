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
  private authSub: Subscription;
  public id: string;
  private notifN: Subscription;
  private notifC: Subscription;
  private notifP: Subscription;

  constructor( private authService: AuthService, private ladderService: LadderService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.id = localStorage.getItem('_id');
    this.notifN = timer(1000, 2000)
      .subscribe(data => {
        this.ladderService.getNumberChallenge(this.id);
      });
    this.notifC = timer(1000, 2000)
      .subscribe(data => {
        this.ladderService.getNumberConfirmations(this.id);
      });
    this.notifP = timer(1000, 2000)
      .subscribe(data => {
        this.ladderService.getNumberPrevious(this.id);
      });
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(harsh => {
        if (harsh) {
          this.id = localStorage.getItem('_id');
          this.notifN = timer(1000, 2000)
            .subscribe(data => {
              this.ladderService.getNumberChallenge(this.id);
            });
          this.notifC = timer(1000, 2000)
            .subscribe(data => {
              this.ladderService.getNumberConfirmations(this.id);
            });
          this.notifP = timer(1000, 2000)
            .subscribe(data => {
              this.ladderService.getNumberPrevious(this.id);
            });
        }
      });
    const isGranted = this.ladderService.notifications.isPermissionGranted;
    if (!isGranted) {
      this.ladderService.notifications.requestPermission();
    }
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.notifN.unsubscribe();
    this.notifC.unsubscribe();
    this.notifP.unsubscribe();
  }
}
