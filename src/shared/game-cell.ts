export class GameCell {

    public value: number;
    public values: number[];


    private readonly ALL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    constructor() {
        this.value = 0;
        this.values = this.ALL_VALUES;
    }

    public assignValue(value: number): boolean {
        // Solo la prima volta
        if (this.value !== 0 || value === 0) {
            return false;
        }

        this.value = value;
        this.values = [];
        return true;
    }

    public setValue(value: number) {
        this.value = value;
        this.values = this.ALL_VALUES.filter( (elem, index, a) => elem !== value );
    }


    public copyFrom(other: GameCell) {
        this.value = other.value;
        this.values = other.values.filter(() => true);
    }

    public guessValue(): boolean {
        if (this.values.length > 0) {
            this.value = this.values.pop();
            return true;
        }

        return false;
    }

}
