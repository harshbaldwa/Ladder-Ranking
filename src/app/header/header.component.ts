import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isMobile = ( window.innerWidth < 960 );
  notifications = '2';

  ngOnInit() {
    if (Number(this.notifications) >= 100) {
      this.notifications = '99+';
    }
  }

}
