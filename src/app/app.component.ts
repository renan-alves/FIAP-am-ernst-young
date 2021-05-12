import { Component } from '@angular/core';
import { faChartLine, faUserFriends, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'am-ernst-young';

  faChartLine = faChartLine;
  faUserFriends = faUserFriends;
  faSearch = faSearch;
}
