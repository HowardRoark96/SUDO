import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    MainRoutingModule
  ],
  providers: [],
  declarations: [
    MainComponent,
    PageNotFoundComponent
  ]
})
export class MainModule {}
