import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { LadderRanking } from './ladder.model';
import { Subscription } from 'rxjs';
import { LadderService } from '../app.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-ladder-table',
  templateUrl: './ladder-table.component.html',
  styleUrls: ['./ladder-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class LadderTableComponent implements OnInit, OnDestroy {

  sportName = new FormControl('');
  gender = new FormControl('');
  filter = new FormControl('');
  private authSubs: Subscription;
  public Id = localStorage.getItem('_id');

  tableM: LadderRanking[] = [];
  tableF: LadderRanking[] = [];
  private tableSub: Subscription;
  public sportsSub: Subscription;
  userAuthenticated = false;

  issquash;
  istt;
  istennis;
  isbadminton;
  isfifa;

  ismale = true;

  trophy = '';

  dataSourceMale;
  dataSourceFemale;

  displayedColumns: string[] = ['rank', 'username', 'points'];
  expandedElement: LadderRanking | null;

  constructor(public ladderService: LadderService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('_id') == null) {
      this.issquash = true;
      this.istt = true;
      this.istennis = true;
      this.isbadminton = true;
      this.isfifa = true;
      this.sportName.setValue('squash');
      localStorage.setItem('sport', 'squash');
    }
    this.gender.setValue('male');
    this.ladderService.getSports(localStorage.getItem('_id'));
    this.sportName.setValue(localStorage.getItem('sport'));
    this.sportsSub = this.ladderService.getSportsUpdateListener()
      .subscribe((sport) => {
        for (const entry of sport) {
          switch (entry) {
            case 'squash':
              this.issquash = true;
              break;
            case 'tt':
              this.istt = true;
              break;
            case 'tennis':
              this.istennis = true;
              break;
            case 'badminton':
              this.isbadminton = true;
              break;
            case 'fifa':
              this.isfifa = true;
              break;
            default:
              break;
          }
        }
      });
    // this.sportName.setValue(localStorage.getItem('sport'));
    this.ladderService.getLadder(this.sportName.value);
    this.tableSub = this.ladderService.getLadderUpdateListener()
      .subscribe((table: LadderRanking[]) => {
        this.tableM = [];
        this.tableF = [];
        let countM = 1;
        let countF = 1;
        for (const player of table) {
          if (player.gender === 'male') {
            player.rank = countM;
            this.tableM.push(player);
            countM = countM + 1;
          } else {
            player.rank = countF;
            this.tableF.push(player);
            countF = countF + 1;
          }
        }
        this.dataSourceMale = new MatTableDataSource(this.tableM);
        this.dataSourceFemale = new MatTableDataSource(this.tableF);
      });
    this.userAuthenticated = this.authService.getIsAuth();
    this.authSubs = this.authService.getAuthStatusListener().subscribe(
      isAuthenticated => {
        this.userAuthenticated = isAuthenticated;
      }
    );
  }

  applyFilter(filterValue: string, dataSource: MatTableDataSource<LadderRanking[]>) {
    dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTable(sport: string) {
    localStorage.setItem('sport', sport);
    this.ladderService.getLadder(sport);
    this.tableSub = this.ladderService.getLadderUpdateListener()
      .subscribe((table: LadderRanking[]) => {
        this.tableM = [];
        this.tableF = [];
        let countM = 1;
        let countF = 1;
        for (const player of table) {
          if (player.gender === 'male') {
            player.rank = countM;
            this.tableM.push(player);
            countM = countM + 1;
          } else {
            player.rank = countF;
            this.tableF.push(player);
            countF = countF + 1;
          }
        }
      });
    this.filter.setValue('');
  }

  getTableGender(gender: string) {
    if (gender === 'male') {
      this.ismale = true;
    } else {
      this.ismale = false;
    }
  }

  ngOnDestroy() {
    this.tableSub.unsubscribe();
    this.authSubs.unsubscribe();
    localStorage.setItem('sport', this.sportName.value);
  }
}
