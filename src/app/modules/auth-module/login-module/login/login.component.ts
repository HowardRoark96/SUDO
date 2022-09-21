import { Component } from '@angular/core';
import { AuthService } from '../../shared-module/services/auth.service';
import { Router } from '@angular/router';

import firebase from 'firebase/compat';
import Error = firebase.auth.Error;

@Component({
  selector: 'app-login',
  styleUrls: ['login.component.scss'],
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onLogin(formValue: { email: string, password: string }) {
    const {email, password} = formValue;

    this.authService.login(email, password).then(
      () => this.router.navigate(['/']),
      (error: Error) => this.error = error.message
    );
  }
}
