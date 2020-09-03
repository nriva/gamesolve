import { Component } from '@angular/core';
import { GameSchema } from './game-schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamesolve';

  public schema: GameSchema =  new GameSchema();

  constructor() {

  }


}
