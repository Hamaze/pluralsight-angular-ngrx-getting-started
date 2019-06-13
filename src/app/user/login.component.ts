import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import * as fromUser from './user.reducer';

import { AuthService } from './auth.service';
import { UserActionTypes } from './user.actions';
import * as userActions from './user.actions';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromUser.State>) {
  }

  ngOnInit(): void {
    // TODO unsubscribe
    this.store.pipe(select(fromUser.getMaskUserName)).subscribe(
      shouldMaskUserName => this.maskUserName = shouldMaskUserName
    );
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new userActions.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
