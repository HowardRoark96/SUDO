import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    LoginRoutingModule
  ],
  providers: [],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
