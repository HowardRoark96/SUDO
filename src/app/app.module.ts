import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SudokuComponent } from './sudoku/sudoku.component';
import { BoardComponent } from './board/board.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthModule } from './modules/auth-module/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SudokuComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
