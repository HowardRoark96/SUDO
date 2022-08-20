import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell, EmptyCell} from "../sudoku/sudoku.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: Cell[][];
  @Output() boardChange = new EventEmitter<EmptyCell|null>();

  controlPanel = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  selectedNumber = -1;

  constructor() {
  }

  ngOnInit(): void {
  }

  selectNumber(selectedNumber: number) {
    this.selectedNumber = selectedNumber;
    this.boardChange.emit(null);
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

// // The board will be completely solved once for each item in the empty cell list.
// // The empty cell array is rotated on each iteration, so that the order of the empty cells
// // And thus the order of solving the game, is different each time.
// // The solution for each attempt is pushed to a possibleSolutions array as a string
// // Multiple solutions are identified by taking a unique Set from the possible solutions
// // and measuring its length. If multiple possible solutions are found at any point
// // If will return true, prompting the pokeHoles function to select a new value for removal.
//
//   function multiplePossibleSolutions (boardToCheck) {
//     const possibleSolutions = []
//     const emptyCellArray = emptyCellCoords(boardToCheck)
//     for (let index = 0; index < emptyCellArray.length; index++) {
//       // Rotate a clone of the emptyCellArray by one for each iteration
//       emptyCellClone = [...emptyCellArray]
//       const startingPoint = emptyCellClone.splice(index, 1);
//       emptyCellClone.unshift( startingPoint[0] )
//       thisSolution = fillFromArray( boardToCheck.map( row => row.slice() ) , emptyCellClone)
//       possibleSolutions.push( thisSolution.join() )
//       if (Array.from(new Set(possibleSolutions)).length > 1 ) return true
//     }
//     return false
//   }
//
// // This will attempt to solve the puzzle by placing values into the board in the order that
// // the empty cells list presents
//   function fillFromArray(startingBoard, emptyCellArray) {
//     const emptyCell = nextStillEmptyCell(startingBoard, emptyCellArray)
//     if (!emptyCell) return startingBoard
//     for (num of shuffle(numArray) ) {
//       pokeCounter++
//       if ( pokeCounter > 60_000_000 ) throw new Error ("Poke Timeout")
//       if ( safeToPlace( startingBoard, emptyCell, num) ) {
//         startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = num
//         if ( fillFromArray(startingBoard, emptyCellArray) ) return startingBoard
//         startingBoard[ emptyCell.rowIndex ][ emptyCell.colIndex ] = 0
//       }
//     }
//     return false
//   }
//
// // As numbers get placed, not all of the initial cells are still empty.
// // This will find the next still empty cell in the list
//   function nextStillEmptyCell (startingBoard, emptyCellArray) {
//     for (coords of emptyCellArray) {
//       if (startingBoard[ coords.row ][ coords.col ] === 0) return {rowIndex: coords.row, colIndex: coords.col}
//     }
//     return false
//   }
//
// // Generate array from range, inclusive of start & endbounds.
//   const range = (start, end) => {
//     const length = end - start + 1
//     return Array.from( {length} , ( _ , i) => start + i)
//   }
//
// // Get a list of all empty cells in the board from top-left to bottom-right
//   function emptyCellCoords (startingBoard) {
//     const listOfEmptyCells = []
//     for (const row of range(0,8)) {
//       for (const col of range(0,8) ) {
//         if (startingBoard[row][col] === 0 ) listOfEmptyCells.push( {row, col } )
//       }
//     }
//     return listOfEmptyCells
//   }
//   }
// }
