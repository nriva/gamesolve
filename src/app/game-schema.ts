import { GameCell } from '../shared/game-cell';
import { element } from '@angular/core/src/render3';
import { checkNoChangesInRootView } from '@angular/core/src/render3/instructions';
import { ViewChild, ElementRef } from '@angular/core';

export class GameSchema {

    public cells: GameCell[][];

    public inputCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    /*
       public highlight: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                       [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                       [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    */

   public startupCells: number[][] = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]];


    public origCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    public solutionResult = '';
    public checkResult = '';

    public solved = false;
    public solving: boolean;
    public stopped: boolean;

    public round = 0;

    constructor() {

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.origCells[i][j] = this.startupCells[i][j];
            }
        }

        this.cells = this.createCells(this.origCells);
    }


    private createCells(origCells?: number[][]) {
        const cells: GameCell[][] = new Array(9);
        for (let i = 0; i < 9; i++) {
            cells[i] = new Array(9);
            for (let j = 0; j < 9; j++) {
                cells[i][j] = new GameCell();
                if (typeof origCells !== 'undefined') {
                    cells[i][j].assignValue(origCells[i][j]);
                }
            }

        }
        return cells;
    }

    public getCellValueRep(row: number, col: number): string {
        const values = this.getCellValuesRep(row, col);
        return `${this.cells[row][col].value === 0 ? '' : String(this.cells[row][col].value)}${values}`;
    }

    public getCellValuesRep(row: number, col: number): string {
        let values = '';
        if (this.cells[row][col].values.length > 0) {
            values = ` [${String(this.cells[row][col].values)}]`;
        }
        return values;
    }

    public resetWorkCells() {
        this.cells = this.createCells(this.origCells);
        this.stopped = false;
        this.solutionResult = '';
    }

    public stop() {
        this.stopped = true;
        this.solving = false;
    }


    public step() {

        if (this.stopped) { return; }

        const workCells: GameCell[][] = this.createCells();
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                workCells[r][c].value = this.cells[r][c].value;
                workCells[r][c].values = this.cells[r][c].values.filter(() => true);
            }
        }

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.cells[r][c].value !== 0) {
                    this.removeFromRow(workCells, r, this.cells[r][c].value);
                    this.removeFromCol(workCells, c, this.cells[r][c].value);
                    this.removeFromSquare(workCells, r, c , this.cells[r][c].value);
                }
            }
        }

        let solvedOneCell = false;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (workCells[r][c].value === 0 && workCells[r][c].values.length === 1) {
                    workCells[r][c].value = workCells[r][c].values[0];
                    solvedOneCell = true;
                    workCells[r][c].values = [];
                    //this.highlight[r][c] = 1;
                }
            }
        }

        // copy workCells to this.cells
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].value = workCells[r][c].value;
                this.cells[r][c].values = workCells[r][c].values.filter(() => true);
            }
        }

        this.solved = true;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.cells[r][c].value === 0) {
                    this.solved = false;
                }
            }
        }


        this.round++;

        const that = this;
        if (!this.solved && this.round <= 99999 && solvedOneCell) {
            if (this.solving) { setTimeout( () => that.step(), 1000); }
        } else {
            this.lastRound(solvedOneCell);
        }

    }

    public solve() {

        this.stopped = false;
        this.solved = false;
        this.round = 0;
        this.solving = true;
        this.step();
    }

    private lastRound(solvedOneCell: boolean) {
        this.solving = false;
        this.stopped = true;
        if (!solvedOneCell) {
            this.solutionResult = 'Solution search stopped after ' + this.round + ' tentatives';
        } else if (!this.solved) {
            this.solutionResult = 'Solution not found after ' + this.round + ' tentatives';
        } else {
            this.solutionResult = 'Solution found after ' + this.round + ' tentatives';
        }
        if (this.solved) {
            this.check();
        }

    }

    private removeFromSquare(cells: GameCell[][], r: number, c: number, value: number) {
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);


        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const a = cells[sr * 3 + i][sc * 3 + j].values.filter((value_, index, arr) => value_ !== value);
                cells[sr * 3 + i][sc * 3 + j].values =  a;
            }
        }

    }

    private removeFromCol(cells: GameCell[][], c: number, value: number) {
        for (let i = 0; i < 9; i++) {
            cells[i][c].values =  cells[i][c].values.filter((value_, index, arr) => value_ !== value);
        }
    }

    private removeFromRow(cells: GameCell[][], r: number, value: number) {
        for (let i = 0; i < 9; i++) {
            const array = cells[r][i].values.filter((value_, index, arr) => value_ !== value);
            cells[r][i].values =  array;
        }

    }

    public check() {

        let error = false;

        this.checkResult = 'Checking rows...';
        for (let r = 0; r < 9; r++) {

            const positions  = this.getRowPositions(r);
            error = error || !this.chekPostions(r, positions, 'row');
        }
        this.checkResult = 'Checking columns...';
        if (!error) {
            for (let c = 0; c < 9; c++) {
                const positions  = this.getColPositions(c);
                error = error || !this.chekPostions(c, positions, 'column');
            }
        }
        this.checkResult = 'Checking squares...';
        if (!error) {
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const positions  = this.getSquarePositions(r, c);
                    error = error || !this.chekPostions('${r},${c}', positions, 'square');
                }
            }
        }
        if (!error) {
            this.checkResult = 'Checked!';
        }
    }

    chekPostions(orign: any, positions: {row: number, col: number}[], checkTypeMsg: string): boolean {
        const counters = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        // tslint:disable-next-line: prefer-for-of
        for (let p = 0; p < positions.length; p++) {
            counters[ this.cells[ positions[p].row ][ positions[p].col].value ]++;
        }

        if (counters[0] > 0) {
            this.checkResult = 'Row ${r} not completely solved';
            return false;
        }

        const wrongindex = counters.findIndex( (value, index, arr) => index === 0 ? false : value > 1);
        if (wrongindex !== -1) {
            this.checkResult = `Number ${wrongindex} in present more than once in ${checkTypeMsg} ${orign}`;
            return false;
        }

        return true;
    }



    getRowPositions(currentrow: number): {row: number, col: number}[] {

        const postions = [];
        for (let c = 0; c < 9; c++) {
            postions.push({row: currentrow, col: c});
        }

        return postions;
    }

    getColPositions(currentcol: number): {row: number, col: number}[] {

        const postions = [];
        for (let r = 0; r < 9; r++) {
            postions.push({row: r, col: currentcol});
        }

        return postions;
    }

    getSquarePositions(sqrow: number, sqcol: number): {row: number, col: number}[] {

        const postions = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                postions.push({row: sqrow * 3 + r, col: sqcol * 3 + c});
            }
        }

        return postions;
    }

    public setInputValue(row: number, col: number, value: string) {
        this.inputCells[row][col] = value.length === 0 ? 0 : Number(value);
        this.cells[row][col].setValue(this.inputCells[row][col]);
    }
}

