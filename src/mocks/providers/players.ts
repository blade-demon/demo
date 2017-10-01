import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Player } from '../../models/player';

@Injectable()
export class Players {
  players: Player[] = [];

  defaultPlayer: any = {

  };

  constructor(public http: Http) {
    let players = [
    ];

    for (let player of players) {
      this.players.push(new Player(player));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.players;
    }

    return this.players.filter((player) => {
      for (let key in params) {
        let field = player[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return player;
        } else if (field == params[key]) {
          return player;
        }
      }
      return null;
    });
  }

  add(player: Player) {
    this.players.push(player);
  }

  delete(player: Player) {
    this.players.splice(this.players.indexOf(player), 1);
  }
}
