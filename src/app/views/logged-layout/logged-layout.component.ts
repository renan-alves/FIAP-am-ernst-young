import { Component, OnInit } from '@angular/core';
import { faChartLine, faUserFriends, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss']
})
export class LoggedLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  faChartLine = faChartLine;
  faUserFriends = faUserFriends;
  faSearch = faSearch;
}
