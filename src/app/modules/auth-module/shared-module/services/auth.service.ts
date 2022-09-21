import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import firebase from 'firebase/compat';
import User = firebase.User;

@Injectable()
export class AuthService {

  get authState(): Observable<User | null> {
    return this.af.authState;
  }

  constructor(
    private af: AngularFireAuth
  ) { }

  signUp(email: string, password: string) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.af.signOut();
  }

}
