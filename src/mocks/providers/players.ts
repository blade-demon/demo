import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Player } from '../../models/player';

@Injectable()
export class Players {
  players: Player[] = [];
  constructor(public http: Http) {
    // let players = [
    //   {
    //     "name": "Burt Bear",
    //     "profilePic": "assets/img/speakers/bear.jpg",
    //     "about": "Burt is a Bear."
    //   },
    //   {
    //     "name": "Charlie Cheetah",
    //     "profilePic": "assets/img/speakers/cheetah.jpg",
    //     "about": "Charlie is a Cheetah."
    //   },
    //   {
    //     "name": "Donald Duck",
    //     "profilePic": "assets/img/speakers/duck.jpg",
    //     "about": "Donald is a Duck."
    //   },
    //   {
    //     "name": "Eva Eagle",
    //     "profilePic": "assets/img/speakers/eagle.jpg",
    //     "about": "Eva is an Eagle."
    //   },
    //   {
    //     "name": "Ellie Elephant",
    //     "profilePic": "assets/img/speakers/elephant.jpg",
    //     "about": "Ellie is an Elephant."
    //   },
    //   {
    //     "name": "Molly Mouse",
    //     "profilePic": "assets/img/speakers/mouse.jpg",
    //     "about": "Molly is a Mouse."
    //   },
    //   {
    //     "name": "Paul Puppy",
    //     "profilePic": "assets/img/speakers/puppy.jpg",
    //     "about": "Paul is a Puppy."
    //   }
    // ];

    // for (let player of players) {
    //   this.players.push(player);
    // }
  }

  query(params?: any) {
    console.log(params);
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
