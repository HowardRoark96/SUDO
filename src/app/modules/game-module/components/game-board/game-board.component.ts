import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell } from '../../interfaces/cell.interface';
import { EmptyCell } from '../../interfaces/empty-cell.interface';

@Component({
  selector: 'app-game-board',
  styleUrls: ['game-board.component.scss'],
  templateUrl: 'game-board.component.html'
})
export class GameBoardComponent {
  @Input() board: Cell[][];
  @Input() selectedNumber: number;
  @Input() gameOver: boolean;
  @Input() gamePause: boolean;
  @Output() boardChange = new EventEmitter<EmptyCell|null>();

  constructor() {
  }

  selectCell(lineInd: number, cellInd: number) {
    if (this.selectedNumber === -1)
      return;

    if (!this.board[lineInd][cellInd].disable && this.board[lineInd][cellInd].value !== this.selectedNumber) {
      this.board[lineInd][cellInd].value = this.selectedNumber;
    }

    this.boardChange.emit({rowIndex: lineInd, colIndex: cellInd, value: this.board[lineInd][cellInd].value});
  }
}
