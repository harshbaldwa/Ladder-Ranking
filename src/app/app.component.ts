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
  private notif: Subscription;

  constructor( private authService: AuthService, private ladderService: LadderService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.id = localStorage.getItem('_id');
    this.notif = timer(1000, 2000)
      .subscribe(data => {
        this.ladderService.getNumber(this.id);
      });
    this.authSub = this.authService.getAuthStatusListener()
      .subscribe(harsh => {
        if (harsh) {
          this.id = localStorage.getItem('_id');
          this.notif = timer(1000, 2000)
            .subscribe(data => {
              this.ladderService.getNumber(this.id);
            });
        }
      });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.notif.unsubscribe();
  }
}
