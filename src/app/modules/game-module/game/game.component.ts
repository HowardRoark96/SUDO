import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, of, Subscription, takeWhile, timer } from 'rxjs';
import { Board } from '../interfaces/board.interface';
import { Cell } from '../interfaces/cell.interface';
import { EmptyCell } from '../interfaces/empty-cell.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private blankBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  private numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  private countNumsRemovedFromBoard = 25;
  private counter: number;
  private interval: any;

  selectedNumber = -1;
  gameTime = 0;

  board: Board;
  isGameFinished = false;
  isGameActive = false;

  constructor(
    private readonly chDet: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.generateBoard();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private shuffleArray(array: number[]): number[] {
    let newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [
        newArray[i],
        newArray[j]] = [newArray[j],
        newArray[i]
      ];
    }

    return newArray;
  }

  private rowSafe(puzzleArray: Cell[][], emptyCell: EmptyCell, num: number): boolean {
    const res = !puzzleArray[+emptyCell.rowIndex].some((cell, index) => index !== emptyCell.colIndex && cell.value === num);

    return res;
  }

  private colSafe(puzzleArray: Cell[][], emptyCell: EmptyCell, num: number): boolean {
    const res = !puzzleArray.some((row, index) => index !== +emptyCell.rowIndex && row[+emptyCell.colIndex].value === num);

    return res;
  }

  private boxSafe(puzzleArray: Cell[][], emptyCell: EmptyCell, num: number): boolean {
    const boxStartRow = +emptyCell.rowIndex - (+emptyCell.rowIndex % 3);
    const boxStartCol = +emptyCell.colIndex - (+emptyCell.colIndex % 3);

    let safe = true;

    // Each box region has 3 rows
    for (let boxRow of [0, 1, 2]) {
      // Each box region has 3 columns
      for (let boxCol of [0, 1, 2]) {
        if (
          (boxStartRow + boxRow) !== emptyCell.rowIndex
          && (boxStartCol + boxCol) !==  emptyCell.colIndex
          && puzzleArray[boxStartRow + boxRow][boxStartCol + boxCol].value === num
        ) {
          // If number is found, it is not safe to place
          safe = false;
        }
      }
    }

    return safe;
  }

  private safeToPlace(puzzleArray: Cell[][], emptyCell: EmptyCell, num: number): boolean {
    return this.rowSafe(puzzleArray, emptyCell, num)
      && this.colSafe(puzzleArray, emptyCell, num)
      && this.boxSafe(puzzleArray, emptyCell, num);
  }

  private nextEmptyCell(puzzleArray: Cell[][]): EmptyCell | boolean {
    const emptyCell: EmptyCell = {
      rowIndex: "",
      colIndex: ""
    };

    puzzleArray.forEach((row, rowIndex) => {
      if (emptyCell.colIndex !== "")
        // If this key has already been assigned, skip iteration
        return;

      // find first zero-element
      let firstZero = row.find(col => col.value === 0);

      if (firstZero === undefined)
        // if no zero present, skip to next row
        return;

      emptyCell.rowIndex = rowIndex.toString();
      emptyCell.colIndex = row.indexOf(firstZero).toString();
    });

    if (emptyCell.colIndex !== '')
      return emptyCell;

    // If emptyCell was never assigned, there are no more zeros
    return false;
  }

  private fillBoard(startingBoard: Cell[][]): Cell[][] | boolean {
    const emptyCell = this.nextEmptyCell(startingBoard);

    // If there are no more zeros, the board is finished, return it
    if (!emptyCell)
      return startingBoard;

    // Shuffled [0 - 9 ] array fills board randomly each pass
    const shuffledLine = this.shuffleArray(this.numberArray);

    for (let num of shuffledLine) {
      // counter is a global variable tracking the number of iterations performed in generating a puzzle
      // Most puzzles generate in < 500ms, but occassionally random generation could run in to
      // heavy backtracking and result in a long wait. Best to abort this attempt and restart.
      // 20_000_000 iteration maximum is approximately 1.3 sec runtime.
      // See initializer function for more

      this.counter++;

      if (this.counter > 20000000)
        throw new Error("Recursion Timeout");

      if (this.safeToPlace(startingBoard, emptyCell as EmptyCell, num)) {
        // If safe to place number, place it
        startingBoard[+(emptyCell as EmptyCell).rowIndex][+(emptyCell as EmptyCell).colIndex] = {
          value: num,
          disable: true,
          isValid: true,
          isCellHighlighted: false
        };

        // Recursively call the fill function to place num in next empty cell
        if (this.fillBoard(startingBoard))
          return startingBoard;

        // If we were unable to place the future num, that num was wrong. Reset it and try next value
        startingBoard[+(emptyCell as EmptyCell).rowIndex][+(emptyCell as EmptyCell).colIndex] = {
          value: 0,
          disable: false,
          isValid: false,
          isCellHighlighted: false
        };
      }
    }

    // If unable to place any number, return false, which triggers previous round to go to next num
    return false;
  }

  private getSolvedBoard(): Cell[][] {
    // Create an unaffiliated clone of a fresh board
    const newBoard = this.blankBoard.map(row => row.map(cell => ({
      value: cell,
      disable: true,
      isValid: true,
      isCellHighlighted: false
    })));

    // Populate the board using backtracking algorithm
    this.fillBoard(newBoard);

    return newBoard;
  };

  private getBoard(startingBoard: Cell[][]): [EmptyCell[], Cell[][]] {
    const removedValues = [];

    while (removedValues.length < this.countNumsRemovedFromBoard) {
      const value = Math.floor(Math.random() * 81);
      const randomRowIndex = Math.floor(value / 9);
      const randomColIndex = value % 9;

      // guard against cloning error
      if (!startingBoard[randomRowIndex])
        continue;

      // If cell already empty, restart loop
      if (startingBoard[randomRowIndex][randomColIndex] == {
        value: 0,
        disable: false,
        isValid: false,
        isCellHighlighted: false
      })
        continue;

      // Store the current value at the coordinates
      removedValues.push({
        rowIndex: randomRowIndex,
        colIndex: randomColIndex,
        value: startingBoard[randomRowIndex][randomColIndex].value
      });

      // "poke a hole" in the board at the coords
      startingBoard[randomRowIndex][randomColIndex] = {
        value: 0,
        disable: false,
        isValid: false,
        isCellHighlighted: false
      };

      // Clone this changed board
      const proposedBoard = startingBoard.map(row => row.slice());

      // Attempt to solve the board after removing value. If it cannot be solved, restore the old value.
      // and remove that option from the list
      if (!this.fillBoard(proposedBoard)) {
        startingBoard[randomRowIndex][randomColIndex] = {
          value: removedValues.pop()?.value || 0,
          disable: false,
          isValid: false,
          isCellHighlighted: false
        };
      }
    }

    return [removedValues, startingBoard];
  }

  private getInitialBoard(): Board {
    // Reset global iteration counter to 0 and Try to generate a new game.
    // If counter reaches its maximum limit in the fillPuzzle function, current attemp will abort
    // To prevent the abort from crashing the script, the error is caught and used to re-run
    // this function
    try {
      this.counter = 0;
      let solvedBoard = this.getSolvedBoard();

      // Clone the populated board and poke holes in it.
      // Stored the removed values for clues

      const prepareGameBoard = solvedBoard.map(row => row.map(cell => ({
        value: cell.value,
        disable: true,
        isValid: true,
        isCellHighlighted: false
      })));

      let [removedNumbers, gameBoard] = this.getBoard(prepareGameBoard);

      return {
        removedNumbers,
        gameBoard,
        solvedBoard
      };

    } catch (error) {
    }

    return this.getInitialBoard();
  }

  private highlightedCells(selectedCell: EmptyCell|null): void {
    if (!selectedCell) {
      this.board.gameBoard.forEach(row => row.forEach(cell => cell.isCellHighlighted = false));
    }
    else {
      this.board.gameBoard.forEach((row, rowIndex) => {
        if (rowIndex === +selectedCell.rowIndex) {
          row.forEach(cell => {
            cell.isCellHighlighted = true
          });
        } else {
          row.forEach((cell, cellIndex) => {
            if (cellIndex === +selectedCell.colIndex) {
              cell.isCellHighlighted = true;
            } else {
              cell.isCellHighlighted = false;
            }
          });
        }
      });
    }
  }

  generateBoard(): void {
    this.board = this.getInitialBoard();
  }

  boardChange(selectedCell: EmptyCell|null): void {
    this.highlightedCells(selectedCell);

    if(selectedCell) {
      this.board.gameBoard[+selectedCell.rowIndex][+selectedCell.colIndex].isValid = this.safeToPlace(this.board.gameBoard, selectedCell, selectedCell.value as number);
      this.isGameFinished = !this.board.gameBoard.some(row => row.some(cell => !cell.isValid));
    }
    if (this.isGameFinished)
      this.pauseGame();
  }

  selectNumberChanged(selectedNumber: number) {
    this.selectedNumber = selectedNumber;
  }

  getNewGame() {
    this.generateBoard();
    this.gameTime = 0;
    this.isGameActive = false;
    this.isGameFinished = false;
    this.pauseGame();
  }

  pauseGame() {
    this.isGameActive = !this.isGameActive;

    if (this.isGameActive) {
      this.interval = setInterval(() => {
        this.gameTime++;
      },1000);
    }
    else
      clearInterval(this.interval);
  }
}
