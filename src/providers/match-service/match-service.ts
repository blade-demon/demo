import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Match } from "../../models/match";
import { Storage } from "@ionic/storage";

@Injectable()
export class MatchServiceProvider {
  constructor(public http: Http, public storage: Storage) {

  }

  // 初始化MatchInfo
  initialMatchInfo() {
    // this.storage.remove("matchResult");
  }

  // 设置比赛信息
  setMatchInfo(data) {
    let matchInfo = data;
    // 缓存比赛数据
    this.storage.set("matchResult", JSON.stringify(data));

    // this.storage.set("matchId", matchInfo[0].matchId);
    // this.storage.set("player1Id", matchInfo[0].playerId);
    // this.storage.set("player2Id", matchInfo[1].playerId);
  }

  setTournament(data) {
    this.storage.set("tournament", data);
  }

  getTournament() {
    return this.storage.get('tournament').then(data=> Promise.resolve(data), error => Promise.reject(error));
  }

  // 获取比赛信息
  getMatchInfo() {
    return this.storage.get("matchResult").then(data => Promise.resolve(JSON.parse(data)), error => Promise.reject(error));
  }
}
