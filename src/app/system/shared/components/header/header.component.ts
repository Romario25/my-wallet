import { Component, OnInit } from '@angular/core';
import {User} from '../../../../shared/models/user.model';
import {AuthServices} from '../../../../shared/services/auth.services';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthServices, private router: Router ) { }

  date = new Date();
  user: User;

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
