import { GameCell } from '../shared/game-cell';

export class GameSchema {

    public cells: GameCell[][];

    /*
       public highlight: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                       [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                       [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    */

    public origCells: number[][] = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]];


    /*    
    public cells: number[][] = [
                                [5, 3, 0, 0, 7, 0, 0, 0, 0],
                                [6, 0, 0, 1, 9, 5, 0, 0, 0],
                                [0, 9, 8, 0, 0, 0, 0, 6, 0],
                                [8, 0, 0, 0, 6, 0, 0, 0, 3],
                                [4, 0, 0, 8, 0, 3, 0, 0, 1],
                                [7, 0, 0, 0, 2, 0, 0, 0, 6],
                                [0, 6, 0, 0, 0, 0, 2, 8, 0],
                                [0, 0, 0, 4, 1, 9, 0, 0, 5],
                                [0, 0, 0, 0, 8, 0, 0, 7, 9]];

    public workCells: number[][][] = [
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], []]];
    */
    public solutionResult = '';

    public solved = false;
    public solving: boolean;
    public stopped: boolean;

    public round = 0;

    constructor() {
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
        return (this.cells[row][col].value === 0 ? '' : String(this.cells[row][col].value))
                            + ' [' + String(this.cells[row][col].values) + ']';
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

    }

    private removeFromSquare(cells: GameCell[][], r: number, c: number, value: number) {
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);


        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                //if (cells[sr + i][sc + j].values.length > 1) {

                    const a = cells[sr * 3 + i][sc * 3 + j].values.filter((value_, index, arr) => value_ !== value);
                    cells[sr * 3 + i][sc * 3 + j].values =  a;
                //}
            }
        }

    }

    private removeFromCol(cells: GameCell[][], c: number, value: number) {
        for (let i = 0; i < 9; i++) {
            //if (cells[i][c].values.length > 1) {
                cells[i][c].values =  cells[i][c].values.filter((value_, index, arr) => value_ !== value);
            //}
        }
    }

    private removeFromRow(cells: GameCell[][], r: number, value: number) {
        for (let i = 0; i < 9; i++) {
            //if (cells[r][i].values.length > 1) {
                const array = cells[r][i].values.filter((value_, index, arr) => value_ !== value);
                cells[r][i].values =  array;
            //}
        }

    }


}

