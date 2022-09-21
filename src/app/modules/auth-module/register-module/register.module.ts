import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../shared-module/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule.forRoot()
  ],
  providers: [],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
