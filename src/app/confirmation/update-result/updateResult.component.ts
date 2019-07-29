import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './updateResult.component.html',
  styleUrls: ['./updateResult.component.css']
})

export class UpdateResultComponent implements OnInit {

  id: string;

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
  }
}
