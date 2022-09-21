import { NgModule } from '@angular/core';
import { GameComponent } from './game/game.component';
import { BoardComponent } from '../../board/board.component';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from './game-routing.module';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { TimePipe } from './pipes/time.pipe';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    GameRoutingModule,
    MatIconModule
  ],
  providers: [],
  declarations: [
    GameComponent,
    GameBoardComponent,
    GameControlsComponent,
    BoardComponent,
    TimePipe
  ]
})
export class GameModule {}
