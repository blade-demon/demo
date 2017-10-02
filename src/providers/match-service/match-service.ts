import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

class MatchInfo {
  matchId: any;
  players: any[];
}

@Injectable()
export class MatchServiceProvider {
  private matchInfo:MatchInfo = {
    matchId: "",
    players: []
  };
  constructor(public http: Http) {
    console.log('Hello MatchServiceProvider Provider');
  }

  addAsPlayer(player: any) {
    this.matchInfo.players.push(player);
  }

  getMatchInfo() {
    return this.matchInfo;
  }

  removePlayer(player:any) {
    let currentPlayers = this.matchInfo.players;
    let index = currentPlayers.indexOf(player);
    console.log("删除的是第", index , "个");
    this.matchInfo.players[index] = {};
  }

}
