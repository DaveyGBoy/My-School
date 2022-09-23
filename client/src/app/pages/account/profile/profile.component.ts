import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services//auth/auth.service';
import { Me } from 'src/app/types/types';
import { LoginSignupService } from '../login-signup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isLoggedIn: boolean = false;
  me: Me = {} as Me;
  error: any;
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private loginSignupService: LoginSignupService,
    private router: Router
  ) {
    this.authService.changeLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.loginSignupService.changeMe.subscribe((me) => {
      this.me = me;
    });
    this.loginSignupService.changeLoading.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log(this.isLoggedIn)
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
      ;
    }
    this.loading = this.loginSignupService.isLoading;
    this.me = this.loginSignupService.me;
  }

  logout() {
    this.authService.logout();
    this.loginSignupService.deleteMe();
  }
}