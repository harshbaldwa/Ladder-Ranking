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
  public id = localStorage.getItem('_id');
  public notificationsN = 0;
  public challengesN: Subscription;
  public notificationsP = 0;
  public challengesP: Subscription;
  public notificationsC = 0;
  public challengesC: Subscription;
  private authListenerSub: Subscription;
  userAuthenticated = false;
  constructor(public ladderService: LadderService, private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      });
    this.ladderService.getNumber(this.id);
    this.challengesN = this.ladderService.getChallengesNUpdateListener()
      .subscribe((notifications) => {
        this.notificationsN = notifications;
      });
    this.challengesC = this.ladderService.getChallengesCUpdateListener()
      .subscribe((notifications) => {
        this.notificationsC = notifications;
      });
    this.challengesP = this.ladderService.getChallengesPUpdateListener()
      .subscribe((notifications) => {
        this.notificationsP = notifications;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
    this.challengesN.unsubscribe();
    this.challengesC.unsubscribe();
    this.challengesP.unsubscribe();
  }

}
