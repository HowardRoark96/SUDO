import { EmptyCell } from './empty-cell.interface';
import { Cell } from './cell.interface';

export interface Board {
  removedNumbers: EmptyCell[],
  gameBoard: Cell[][],
  solvedBoard: Cell[][]
}
