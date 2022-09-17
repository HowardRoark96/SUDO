import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  imports: [
    RegisterRoutingModule
  ],
  providers: [],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
