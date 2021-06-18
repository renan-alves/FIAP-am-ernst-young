import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChartLine, faUserFriends, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss']
})
export class LoggedLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  faChartLine = faChartLine;
  faUserFriends = faUserFriends;
  faSearch = faSearch;
  faSignOutAlt = faSignOutAlt;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
