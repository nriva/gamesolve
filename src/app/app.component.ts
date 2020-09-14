import { Component, ViewChild, ElementRef } from '@angular/core';
import { GameSchemaGenerator } from 'src/shared/game-schema-generator';
import { GameSchemaChecker } from 'src/shared/game-schema-checker';
import { GameSchema } from 'src/shared/game-schema';
import { LastRoundCall } from './last-round-call';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements LastRoundCall {
    title = 'gamesolve';

    public isInput = false;
    public isGenerating = false;

    private readonly ACTION_NEW = 'Edit';
    private readonly ACTION_CONFIRM = 'Confirm';
    private readonly ACTION_GENERATE = 'Generate';


    public inputAction = this.ACTION_NEW;
    public generateAction = this.ACTION_GENERATE;


    // Messaggio con l'esito della ricerca della soluzione
    public solutionResult = '';
    public checkResult = '';

    public holes: number;


    public schema: GameSchema = new GameSchema();


  @ViewChild('input11') input11: ElementRef;
  @ViewChild('input12') input12: ElementRef;
  @ViewChild('input13') input13: ElementRef;
  @ViewChild('input14') input14: ElementRef;
  @ViewChild('input15') input15: ElementRef;
  @ViewChild('input16') input16: ElementRef;
  @ViewChild('input17') input17: ElementRef;
  @ViewChild('input18') input18: ElementRef;
  @ViewChild('input19') input19: ElementRef;
  @ViewChild('input21') input21: ElementRef;
  @ViewChild('input22') input22: ElementRef;
  @ViewChild('input23') input23: ElementRef;
  @ViewChild('input24') input24: ElementRef;
  @ViewChild('input25') input25: ElementRef;
  @ViewChild('input26') input26: ElementRef;
  @ViewChild('input27') input27: ElementRef;
  @ViewChild('input28') input28: ElementRef;
  @ViewChild('input29') input29: ElementRef;
  @ViewChild('input31') input31: ElementRef;
  @ViewChild('input32') input32: ElementRef;
  @ViewChild('input33') input33: ElementRef;
  @ViewChild('input34') input34: ElementRef;
  @ViewChild('input35') input35: ElementRef;
  @ViewChild('input36') input36: ElementRef;
  @ViewChild('input37') input37: ElementRef;
  @ViewChild('input38') input38: ElementRef;
  @ViewChild('input39') input39: ElementRef;
  @ViewChild('input41') input41: ElementRef;
  @ViewChild('input42') input42: ElementRef;
  @ViewChild('input43') input43: ElementRef;
  @ViewChild('input44') input44: ElementRef;
  @ViewChild('input45') input45: ElementRef;
  @ViewChild('input46') input46: ElementRef;
  @ViewChild('input47') input47: ElementRef;
  @ViewChild('input48') input48: ElementRef;
  @ViewChild('input49') input49: ElementRef;
  @ViewChild('input51') input51: ElementRef;
  @ViewChild('input52') input52: ElementRef;
  @ViewChild('input53') input53: ElementRef;
  @ViewChild('input54') input54: ElementRef;
  @ViewChild('input55') input55: ElementRef;
  @ViewChild('input56') input56: ElementRef;
  @ViewChild('input57') input57: ElementRef;
  @ViewChild('input58') input58: ElementRef;
  @ViewChild('input59') input59: ElementRef;
  @ViewChild('input61') input61: ElementRef;
  @ViewChild('input62') input62: ElementRef;
  @ViewChild('input63') input63: ElementRef;
  @ViewChild('input64') input64: ElementRef;
  @ViewChild('input65') input65: ElementRef;
  @ViewChild('input66') input66: ElementRef;
  @ViewChild('input67') input67: ElementRef;
  @ViewChild('input68') input68: ElementRef;
  @ViewChild('input69') input69: ElementRef;
  @ViewChild('input71') input71: ElementRef;
  @ViewChild('input72') input72: ElementRef;
  @ViewChild('input73') input73: ElementRef;
  @ViewChild('input74') input74: ElementRef;
  @ViewChild('input75') input75: ElementRef;
  @ViewChild('input76') input76: ElementRef;
  @ViewChild('input77') input77: ElementRef;
  @ViewChild('input78') input78: ElementRef;
  @ViewChild('input79') input79: ElementRef;
  @ViewChild('input81') input81: ElementRef;
  @ViewChild('input82') input82: ElementRef;
  @ViewChild('input83') input83: ElementRef;
  @ViewChild('input84') input84: ElementRef;
  @ViewChild('input85') input85: ElementRef;
  @ViewChild('input86') input86: ElementRef;
  @ViewChild('input87') input87: ElementRef;
  @ViewChild('input88') input88: ElementRef;
  @ViewChild('input89') input89: ElementRef;
  @ViewChild('input91') input91: ElementRef;
  @ViewChild('input92') input92: ElementRef;
  @ViewChild('input93') input93: ElementRef;
  @ViewChild('input94') input94: ElementRef;
  @ViewChild('input95') input95: ElementRef;
  @ViewChild('input96') input96: ElementRef;
  @ViewChild('input97') input97: ElementRef;
  @ViewChild('input98') input98: ElementRef;
  @ViewChild('input99') input99: ElementRef;

  constructor() {
  }

  public input() {

    if (this.isInput) {

      this.schema.setInputValue(0, 0, this.input11.nativeElement.value);
      this.schema.setInputValue(0, 1, this.input12.nativeElement.value);
      this.schema.setInputValue(0, 2, this.input13.nativeElement.value);
      this.schema.setInputValue(0, 3, this.input14.nativeElement.value);
      this.schema.setInputValue(0, 4, this.input15.nativeElement.value);
      this.schema.setInputValue(0, 5, this.input16.nativeElement.value);
      this.schema.setInputValue(0, 6, this.input17.nativeElement.value);
      this.schema.setInputValue(0, 7, this.input18.nativeElement.value);
      this.schema.setInputValue(0, 8, this.input19.nativeElement.value);
      this.schema.setInputValue(1, 0, this.input21.nativeElement.value);
      this.schema.setInputValue(1, 1, this.input22.nativeElement.value);
      this.schema.setInputValue(1, 2, this.input23.nativeElement.value);
      this.schema.setInputValue(1, 3, this.input24.nativeElement.value);
      this.schema.setInputValue(1, 4, this.input25.nativeElement.value);
      this.schema.setInputValue(1, 5, this.input26.nativeElement.value);
      this.schema.setInputValue(1, 6, this.input27.nativeElement.value);
      this.schema.setInputValue(1, 7, this.input28.nativeElement.value);
      this.schema.setInputValue(1, 8, this.input29.nativeElement.value);
      this.schema.setInputValue(2, 0, this.input31.nativeElement.value);
      this.schema.setInputValue(2, 1, this.input32.nativeElement.value);
      this.schema.setInputValue(2, 2, this.input33.nativeElement.value);
      this.schema.setInputValue(2, 3, this.input34.nativeElement.value);
      this.schema.setInputValue(2, 4, this.input35.nativeElement.value);
      this.schema.setInputValue(2, 5, this.input36.nativeElement.value);
      this.schema.setInputValue(2, 6, this.input37.nativeElement.value);
      this.schema.setInputValue(2, 7, this.input38.nativeElement.value);
      this.schema.setInputValue(2, 8, this.input39.nativeElement.value);
      this.schema.setInputValue(3, 0, this.input41.nativeElement.value);
      this.schema.setInputValue(3, 1, this.input42.nativeElement.value);
      this.schema.setInputValue(3, 2, this.input43.nativeElement.value);
      this.schema.setInputValue(3, 3, this.input44.nativeElement.value);
      this.schema.setInputValue(3, 4, this.input45.nativeElement.value);
      this.schema.setInputValue(3, 5, this.input46.nativeElement.value);
      this.schema.setInputValue(3, 6, this.input47.nativeElement.value);
      this.schema.setInputValue(3, 7, this.input48.nativeElement.value);
      this.schema.setInputValue(3, 8, this.input49.nativeElement.value);
      this.schema.setInputValue(4, 0, this.input51.nativeElement.value);
      this.schema.setInputValue(4, 1, this.input52.nativeElement.value);
      this.schema.setInputValue(4, 2, this.input53.nativeElement.value);
      this.schema.setInputValue(4, 3, this.input54.nativeElement.value);
      this.schema.setInputValue(4, 4, this.input55.nativeElement.value);
      this.schema.setInputValue(4, 5, this.input56.nativeElement.value);
      this.schema.setInputValue(4, 6, this.input57.nativeElement.value);
      this.schema.setInputValue(4, 7, this.input58.nativeElement.value);
      this.schema.setInputValue(4, 8, this.input59.nativeElement.value);
      this.schema.setInputValue(5, 0, this.input61.nativeElement.value);
      this.schema.setInputValue(5, 1, this.input62.nativeElement.value);
      this.schema.setInputValue(5, 2, this.input63.nativeElement.value);
      this.schema.setInputValue(5, 3, this.input64.nativeElement.value);
      this.schema.setInputValue(5, 4, this.input65.nativeElement.value);
      this.schema.setInputValue(5, 5, this.input66.nativeElement.value);
      this.schema.setInputValue(5, 6, this.input67.nativeElement.value);
      this.schema.setInputValue(5, 7, this.input68.nativeElement.value);
      this.schema.setInputValue(5, 8, this.input69.nativeElement.value);
      this.schema.setInputValue(6, 0, this.input71.nativeElement.value);
      this.schema.setInputValue(6, 1, this.input72.nativeElement.value);
      this.schema.setInputValue(6, 2, this.input73.nativeElement.value);
      this.schema.setInputValue(6, 3, this.input74.nativeElement.value);
      this.schema.setInputValue(6, 4, this.input75.nativeElement.value);
      this.schema.setInputValue(6, 5, this.input76.nativeElement.value);
      this.schema.setInputValue(6, 6, this.input77.nativeElement.value);
      this.schema.setInputValue(6, 7, this.input78.nativeElement.value);
      this.schema.setInputValue(6, 8, this.input79.nativeElement.value);
      this.schema.setInputValue(7, 0, this.input81.nativeElement.value);
      this.schema.setInputValue(7, 1, this.input82.nativeElement.value);
      this.schema.setInputValue(7, 2, this.input83.nativeElement.value);
      this.schema.setInputValue(7, 3, this.input84.nativeElement.value);
      this.schema.setInputValue(7, 4, this.input85.nativeElement.value);
      this.schema.setInputValue(7, 5, this.input86.nativeElement.value);
      this.schema.setInputValue(7, 6, this.input87.nativeElement.value);
      this.schema.setInputValue(7, 7, this.input88.nativeElement.value);
      this.schema.setInputValue(7, 8, this.input89.nativeElement.value);
      this.schema.setInputValue(8, 0, this.input91.nativeElement.value);
      this.schema.setInputValue(8, 1, this.input92.nativeElement.value);
      this.schema.setInputValue(8, 2, this.input93.nativeElement.value);
      this.schema.setInputValue(8, 3, this.input94.nativeElement.value);
      this.schema.setInputValue(8, 4, this.input95.nativeElement.value);
      this.schema.setInputValue(8, 5, this.input96.nativeElement.value);
      this.schema.setInputValue(8, 6, this.input97.nativeElement.value);
      this.schema.setInputValue(8, 7, this.input98.nativeElement.value);
      this.schema.setInputValue(8, 8, this.input99.nativeElement.value);
    }

    this.isInput = !this.isInput;
    this.inputAction = this.isInput ? this.ACTION_CONFIRM : this.ACTION_NEW;
}

  public onPaste(event: ClipboardEvent) {

    if (!this.isInput) {
        return;
    }

    let pastedText = event.clipboardData.getData('text');

    if (typeof pastedText === 'undefined') { return; }
    if (pastedText === null) { return; }
    pastedText = pastedText.trim();
    if (pastedText.length === 0) { return; }

    const lines = pastedText.split('\r');

    let setCounter = 0;

    if (lines.length === 9) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < lines.length; i++) {
        const values = lines[i].trim().split(',');
        if (values.length === 9) {
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < values.length; j++) {
              this.schema.setInputValue(i, j, values[j].trim(), false);
              setCounter++;
          }
        }
      }
    }

    if (setCounter === 81) {
      this.schema.confirmAllInputValue();
      this.isInput = false;
      this.inputAction = this.ACTION_NEW;
      this.solutionResult = '';
      this.schema.round = 0;
      this.checkResult = '';
    }


  }

public stop() {
  this.schema.stop();
}

public pause() {
  this.schema.pause();
}

public step() {
  this.schema.step(this);
}

public solve() {
  this.solutionResult = '';
  this.schema.solve(this);
}

public lastRound(schema: GameSchema, solvedOneCell: boolean) {
  if (!solvedOneCell) {
      this.solutionResult = 'Solution search stopped after ' + schema.getRounds() + ' steps.';
  } else if (!schema.isSolved()) {
      this.solutionResult = 'Solution not found after ' + schema.getRounds() + ' steps.';
  } else {
      this.solutionResult = 'Solution found after ' + schema.getRounds() + ' steps.';
  }
}

public check() {
  const checker = new GameSchemaChecker();
  const result = checker.check(this.schema.getValues());
  this.checkResult = result.resultMessage;
}

public generate() {

  if (this.isGenerating) {

    this.solutionResult = '';
    this.schema.resetCells();
    const generator: GameSchemaGenerator = new GameSchemaGenerator(9, this.holes);
    generator.fillValues();
    this.schema.setCells(generator.mat);
    this.isGenerating = false;
    this.generateAction = this.ACTION_GENERATE;
  } else {
    this.isGenerating = true;
    this.generateAction = this.ACTION_CONFIRM;
  }
}

public reset() {
  this.solutionResult = '';
  this.schema.resetCells();
}



}


