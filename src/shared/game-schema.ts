import { GameCell } from '../shared/game-cell';
import { GameSchemaChecker } from 'src/shared/game-schema-checker';
import { GameSchemaGenerator } from 'src/shared/game-schema-generator';
import { LastRoundCall } from 'src/app/last-round-call';

export class GameSchema {

    // elle effettive
    public cells: GameCell[][];

    // celle valorizzate nel processo di input
    public inputCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    // Esempio di partenza
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


    // Celle prima dell'inizio della soluzione
    public origCells: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];



    public solved = false;
    public solving: boolean;
    public stopped: boolean;

    public round = 0;

    private readonly MAX_ROUNDS = 99999;

    lastRoundCall: LastRoundCall;

    constructor() {

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.origCells[i][j] = this.startupCells[i][j];
            }
        }

        this.cells = this.createCells(this.origCells);
    }

    public isSolving() { return this.solving; }
    public isStopped() { return this.stopped; }
    public isSolved() { return this.solved; }

    public getRounds() { return this.round; }

    setCells(mat: number[][]) {

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].assignValue(mat[r][c]);
            }
        }

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


    public resetCells() {
        this.round = 0;
        this.cells = this.createCells();
        this.stopped = false;
    }

    public resetWorkCells() {
        this.round = 0;
        this.cells = this.createCells(this.origCells);
        this.stopped = false;
    }

    public stop() {
        this.stopped = true;
        this.solving = false;
    }

    public pause() {
        this.solving = false;
    }

    public solve(lastRoundCall: LastRoundCall  ) {

        this.stopped = false;
        this.solved = false;
        this.round = 0;
        this.solving = true;
        this.step(lastRoundCall);
      }


    public step(lastRoundCall: LastRoundCall  ) {
        this.lastRoundCall = lastRoundCall;
        this.makeStep();
    }

    private makeStep() {

        if (this.stopped) { return; }

        const workCells: GameCell[][] = this.createCells();
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                workCells[r][c].copyFrom(this.cells[r][c]);
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

        let solvedCells = 0;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (workCells[r][c].value === 0 && workCells[r][c].values.length === 1) {
                    solvedCells++;
                    workCells[r][c].assignValue(workCells[r][c].values[0]);
                    // this.highlight[r][c] = 1;
                }
            }
        }

        // copy workCells to this.cells
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                this.cells[r][c].copyFrom(workCells[r][c]);
            }
        }

        this.solved = true;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.cells[r][c].value === 0 || this.cells[r][c].values.length > 0) {
                    this.solved = false;
                }
            }
        }


        this.round++;

        const that = this;
        if (!this.solved && this.round <= this.MAX_ROUNDS && solvedCells > 0) {
            if (this.solving) {
                setTimeout(() => that.makeStep(), 1000);
             }
        } else {
            this.solving = false;
            this.stopped = true;

            this.lastRoundCall.lastRound(this, solvedCells > 0);
        }

    }


    getValues(): number[][] {

        const values: number[][] = Array(9);
        for (let i = 0; i < 9; i++) {
            values[i] = Array(9);
            for (let j = 0; j < 9; j++) {
                values[i][j] = this.cells[i][j].value;
            }
        }
        return values;
    }


    public findInSquare(r: number, c: number, value: number): boolean {
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);


        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const a = this.cells[sr * 3 + i][sc * 3 + j].values.filter((elem, index, arr) => elem !== value);
                this.cells[sr * 3 + i][sc * 3 + j].values =  a;
            }
        }

        return false;

    }

    public findInCol(c: number, value: number) {
        for (let i = 0; i < 9; i++) {
            this.cells[i][c].values =  this.cells[i][c].values.filter((elem, index, arr) => elem !== value);
        }
        return false;
    }

    public findInRow(r: number, value: number) {
        for (let i = 0; i < 9; i++) {
            const array = this.cells[r][i].values.filter((elem, index, arr) => elem !== value);
            this.cells[r][i].values =  array;
        }
        return false;
    }

    private removeFromSquare(cells: GameCell[][], r: number, c: number, value: number) {
        const sr = Math.floor(r / 3);
        const sc = Math.floor(c / 3);


        // 0,1,2 --> 0
        // 3,4,5 --> 1
        // 6,7,8 --> 2

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const a = cells[sr * 3 + i][sc * 3 + j].values.filter((elem, index, arr) => elem !== value);
                cells[sr * 3 + i][sc * 3 + j].values =  a;
            }
        }

    }

    private removeFromCol(cells: GameCell[][], c: number, value: number) {
        for (let i = 0; i < 9; i++) {
            cells[i][c].values =  cells[i][c].values.filter((elem, index, arr) => elem !== value);
        }
    }

    private removeFromRow(cells: GameCell[][], r: number, value: number) {
        for (let i = 0; i < 9; i++) {
            const array = cells[r][i].values.filter((elem, index, arr) => elem !== value);
            cells[r][i].values =  array;
        }

    }


    public setInputValue(row: number, col: number, value: string, confirm: boolean = true) {
        this.inputCells[row][col] = value.length === 0 ? 0 : Number(value);
        if (confirm) {
            this.cells[row][col].setValue(this.inputCells[row][col]);
        }
    }

    confirmAllInputValue() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.cells[row][col].setValue(this.inputCells[row][col]);
            }
      }
    }

}

