import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// MatchInfo: {
//   tournamentId: string;
//   gameRule: string;
//   matches: [{
//     player1Id: string;
//     player2Id: string;
//     player1TeamIndex: number;
//     player2TeamIndex: number;
//   }];
// }

@Injectable()
export class MatchServiceProvider {
  private matchInfo:{tournamentId, gameRule, matches:[{player1Id, player2Id, player1TeamIndex, player2TeamIndex}]};
  constructor(public http: Http) {}

  addAsPlayer(player) {

  }

  selectTeamForPlayer1(matchData: any) {
    this.matchInfo.matches.push(matchData);
  }

  selectTeamForPlayer2(matchData: any) {
    this.matchInfo.matches.push(matchData);
  }

  getMatchInfo() {
    return this.matchInfo;
  }
}
