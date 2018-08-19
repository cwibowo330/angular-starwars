import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LogService } from './log.service';
import { Subject } from '../../node_modules/rxjs';

@Injectable()
export class StarWarsService {
  private characters = [
    { name: 'Luke SkyWalker', side: '' },
    { name: 'Yoda', side: '' },
    { name: 'Darth Vader', side: '' },
    { name: 'r2d2', side: '' }
  ];

  private logService: LogService;
  characterChanged = new Subject<void>();
  http: Http;

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters(){
    this.http.get('https://swapi.co/api/people/').subscribe(
      (response: Response) => {
        console.log(response);
      }
    )
  }

  getCharacters(chosenList){
    if (chosenList === 'all') {
      return this.characters.slice();
    }

    return this.characters.filter(char => {
      return char.side === chosenList;
    });
  }

  onSideChosen(charInfo){
    const pos = this.characters.findIndex(char => {
      return char.name === charInfo.name;
    });
    this.characters[pos].side = charInfo.side;
    this.characterChanged.next();
    this.logService.writeLog('Changed side of: ' +  charInfo.name + ' New Side: ' + charInfo.side);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    // returns -1 if character exists
    if (pos !== -1) {

    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }
}
