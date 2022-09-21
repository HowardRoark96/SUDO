import { Component } from '@angular/core';
import { AuthService } from '../../shared-module/services/auth.service';
import { Router } from '@angular/router';

import firebase from 'firebase/compat';
import Error = firebase.auth.Error;

@Component({
  selector: 'app-register',
  styleUrls: ['register.component.scss'],
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSignUp(formValue: {email: string, password: string }) {
    const {email, password} = formValue;

    this.authService.signUp(email, password).then(
        () => this.router.navigate(['/']),
        (error: Error) => this.error = error.message
    );
  }
}
