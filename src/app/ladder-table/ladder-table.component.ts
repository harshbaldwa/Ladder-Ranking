import { Component, OnInit, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { LadderRanking } from './ladder.model';
import { Subscription } from 'rxjs';
import { LadderService } from '../app.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

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
  filter = new FormControl('');

  table: LadderRanking[] = [];
  private tableSub: Subscription;

  dataSource;

  displayedColumns: string[] = ['rank', 'username', 'points'];
  expandedElement: LadderRanking | null;

  constructor(public ladderService: LadderService, private router: Router) { }

  ngOnInit() {
    this.sportName.setValue(localStorage.getItem('sport'));
    this.ladderService.getLadder(this.sportName.value);
    this.tableSub = this.ladderService.getLadderUpdateListener()
      .subscribe((table: LadderRanking[]) => {
        this.table = table;
        this.dataSource = new MatTableDataSource(table);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTable(sport: string) {
    this.ladderService.getLadder(sport);
    this.tableSub = this.ladderService.getLadderUpdateListener()
      .subscribe((table: LadderRanking[]) => {
        this.table = table;
      });
    this.filter.setValue('');
  }

  ngOnDestroy() {
    this.tableSub.unsubscribe();
    localStorage.setItem('sport', this.sportName.value);
  }
}
