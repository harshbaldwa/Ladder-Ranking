import { Component, OnInit, OnDestroy } from '@angular/core';
import { LadderService } from '../app.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isMobile = ( window.innerWidth < 960 );
  public notifications = 0;
  private notifListenerSub: Subscription;
  public challengesN: Subscription;
  private authListenerSub: Subscription;
  userAuthenticated = false;
  constructor(public ladderService: LadderService, private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      });
    this.ladderService.getNumberChallenge(localStorage.getItem('_id'));
    this.challengesN = this.ladderService.getChallengesNUpdateListener()
      .subscribe((notifications) => {
        this.notifications = notifications;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
    this.challengesN.unsubscribe();
  }

}
