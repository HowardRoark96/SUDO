import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
