import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Match } from "../../models/match";
import { Storage } from "@ionic/storage";

@Injectable()
export class MatchServiceProvider {
  constructor(public http: Http, public storage: Storage) {

  }

  setMatchInfo(data) {
    let matchInfo = data;
    this.storage.set("matchId", matchInfo[0].matchId);
    this.storage.set("player1Id", matchInfo[0].playerId);
    this.storage.set("player2Id", matchInfo[1].playerId);

  }

  getMatchInfo() {
    return this.storage.get("matchId");
  }
}
