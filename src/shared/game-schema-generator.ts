export class GameSchemaGenerator  {
    private N: number; // number of columns/rows.
    private SRN: number; // square root of N
    private K: number; // No. Of missing digits

    public mat: number[][] = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];


    constructor(N: number, K: number) {
        this.N = N;
        this.K = K;

        // Compute square root of N
        const SRNd = Math.sqrt(N);
        this.SRN = Math.floor(SRNd);

        //this.mat = new number[N][N]; 
    }

    public fillValues(): void 	{
        // Fill the diagonal of SRN x SRN matrices
        this.fillDiagonal();

        // Fill remaining blocks
        this.fillRemaining(0, this.SRN);

        // Remove Randomly K digits to make game
        this.removeKDigits();
    }

    /** Fill the diagonal SRN number of SRN x SRN matrices  */
    private fillDiagonal(): void {

        for (let i = 0; i < this.N; i = i + this.SRN) {
            // for diagonal box, start coordinates->i==j 
            this.fillBox(i, i);
        }
    }

    /** Returns false if given 3 x 3 block contains num.  */
    private unUsedInBox(rowStart, colStart, num): boolean {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**  Fill a 3 x 3 matrix. */
    private fillBox(row, col): void {
        let num;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                num = this.randomGenerator(this.N);
                while (!this.unUsedInBox(row, col, num)) {
                   num = this.randomGenerator(this.N);
                }
                this.mat[row + i][col + j] = num;
            }
        }
    }

    // Random generator
    private randomGenerator(num): number {
        return Math.floor((Math.random() * num + 1));
    }

    // Check if safe to put in cell
    private checkIfSafe(i, j, num): boolean {
        return (this.unUsedInRow(i, num) && this.unUsedInCol(j, num) && this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num));
    }

    // check in the row for existence
    private unUsedInRow(i, num): boolean {
        for (let j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    // check in the row for existence
    private unUsedInCol(j, num) : boolean {
        for (let i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    // A recursive function to fill remaining
    // matrix
    private fillRemaining(i: number, j: number): boolean {
        // System.out.println(i+" "+j);
        if (j >= this.N && i < this.N - 1) {
            i = i + 1;
            j = 0;
        }
        if (i >= this.N && j >= this.N) {
            return true;
        }

        if (i < this.SRN) {
            if (j < this.SRN) {
                j = this.SRN;
            }
        } else if (i < this.N - this.SRN) {
            if (j === Math.floor(i / this.SRN) * this.SRN) {
                j = j + this.SRN;
            }
        } else {
            if (j === this.N - this.SRN) {
                i = i + 1;
                j = 0;
                if (i >= this.N) {
                    return true;
                }
            }
        }

        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                   return true;
                }
                this.mat[i][j] = 0;
            }
        }
        return false;
    }

    // Remove the K no. of digits to
    // complete game
    private removeKDigits(): void {
        let count = this.K;
        while (count !== 0) {
            const cellId = this.randomGenerator(this.N * this.N);

            // System.out.println(cellId);
            // extract coordinates i and j
            const i =  Math.floor(cellId / this.N);
            let j = cellId % 9;
            if (j !== 0) {
                j = j - 1;
            }

            // System.out.println(i+" "+j);
            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
    }

    /** Print sudoku  */
    public printSudoku(): void {
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                console.log(this.mat[i][j] + ' ');
            }
            console.log();
        }
        console.log();
    }

    // Driver code 
    /*
	public static void main(String[] args) 
	{ 
		int N = 9, K = 20; 
		Sudoku sudoku = new Sudoku(N, K); 
		sudoku.fillValues(); 
		sudoku.printSudoku(); 
    } 
    */
} 
