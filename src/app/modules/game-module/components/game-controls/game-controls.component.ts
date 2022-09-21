import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmptyCell } from '../../interfaces/empty-cell.interface';

@Component({
  selector: 'app-game-controls',
  styleUrls: ['game-controls.component.scss'],
  templateUrl: 'game-controls.component.html'
})
export class GameControlsComponent {
  @Input() disableControls: boolean;
  @Output() selectNumberChanged = new EventEmitter<number>();

  selectedNumber = -1;

  controlPanel = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  constructor() { }

  selectNumber(selectedNumber: number) {
    this.selectedNumber = selectedNumber;
    this.selectNumberChanged.emit(this.selectedNumber);
  }
}
