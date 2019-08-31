import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LadderService } from './app.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ladder-ranking';
  private notif: Subscription;
  public id: string;

  constructor( private authService: AuthService, private ladderService: LadderService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    this.id = localStorage.getItem('_id');
    this.notif = timer(1000, 5000)
      .subscribe(data => {
        this.ladderService.getNumberChallenge(this.id);
      });
  }
}
