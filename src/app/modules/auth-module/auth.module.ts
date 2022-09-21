import { NgModule } from '@angular/core';
import { LoginModule } from './login-module/login.module';
import { RegisterModule } from './register-module/register.module';
import { AuthRoutingModule } from './auth-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FirebaseOptions } from 'firebase/app';
import { SharedModule } from './shared-module/shared.module';


const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDHd7t5I6fWlfTK-BMlMN9suTCknWZKyPY",
  authDomain: "sudoku-41e98.firebaseapp.com",
  projectId: "sudoku-41e98",
  storageBucket: "sudoku-41e98.appspot.com",
  messagingSenderId: "680617723309",
  appId: "1:680617723309:web:089d362dbec44977288d24"
};

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AuthRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [],
  declarations: []
})
export class AuthModule { }
