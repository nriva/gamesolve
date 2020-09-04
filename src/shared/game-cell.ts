export class GameCell {

    public value: number;
    public values: number[];


    constructor() {
        this.value = 0;
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    public assignValue(value: number) {
        if (this.value !== 0 || value === 0) {
            return;
        }

        this.value = value;
        this.values = [];
    }

    public setValue(value: number) {
        this.value = value;
        this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter( (elem, index, a) => elem !== value );
    }

}
