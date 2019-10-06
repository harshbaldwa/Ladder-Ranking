import { Component, OnInit, OnDestroy } from '@angular/core';
import { LadderService } from '../app.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

export interface CategoryTable {
  name: string;
  category: string;
}

@Component({
  selector: 'app-secy',
  templateUrl: './secy.component.html',
  styleUrls: ['./secy.component.css']
})

export class SecyComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'category'];
  dataSource: any;
  sport: string;
  public tableSub: Subscription;

  constructor(public ladderService: LadderService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.sport = paramMap.get('sport');
    });
    this.ladderService.secyCategory(this.sport);
    this.tableSub = this.ladderService.secyCategoryUpdateListener()
      .subscribe(data => {
        this.dataSource = data;
      });
  }

  ngOnDestroy() {
    this.tableSub.unsubscribe();
  }

}
