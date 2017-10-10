import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Match } from "../../models/match";

@Injectable()
export class MatchServiceProvider {
  constructor(public http: Http) {}

  addAsPlayer(player, playerIndex, matchIndex) {
    if(!playerIndex) {
      console.log(player.gamepochPlayerId);
      // this.match.matches[matchIndex].player1Id = player.gamepochPlayerId;
    } else {
      console.log(player.gamepochPlayerId);
      // this.match.matches[matchIndex].player2Id = player.gamepochPlayerId;
    }
  }

  selectTeamForPlayer1(matchData: any) {
    // this.matchInfo.matches.push(matchData);
  }

  selectTeamForPlayer2(matchData: any) {
    // this.matchInfo.matches.push(matchData);
  }

  getMatchInfo() {
    // return this.matchInfo;
  }
}
