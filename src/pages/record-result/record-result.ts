import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { NBATeamsService } from "../../providers/nbateams.service";
import { MatchServiceProvider } from '../../providers/match-service/match-service';
import { Api } from '../../providers/api/api';
@Component({
  selector: 'page-record-result',
  templateUrl: 'record-result.html'
})

export class RecordResultPage {
  matchInfo: any;
  teams: any[];
  currentTeams: any[];
  currentPlayers: any[];
  currentResults: any[];
  resultIndex: number;
  gameRule: string;
  matchId: string;

  constructor(public navCtrl: NavController,
    public loadCtrl: LoadingController,
    public navParams: NavParams,
    public nbateamservice: NBATeamsService,
    public alertCtrl: AlertController,
    public matchService: MatchServiceProvider,
    public api: Api,
    private storage: Storage) {

    this.teams = this.nbateamservice.getNBATeams();
    this.matchInfo = this.navParams.get("match");
    this.resultIndex = this.navParams.get("index");
    this.gameRule = this.navParams.get('gameRule');
    this.matchId = this.navParams.get("matchId");

    this.currentTeams = [];
    this.currentTeams[0] = this.teams[this.matchInfo.results[this.resultIndex].player1.teamId];
    this.currentTeams[1] = this.teams[this.matchInfo.results[this.resultIndex].player2.teamId];

    this.currentResults = [];
    this.currentResults[0] = this.matchInfo.results[this.resultIndex].player1;
    this.currentResults[1] = this.matchInfo.results[this.resultIndex].player2;

    // console.log(this.matchInfo);
    // console.log(this.teams);
  }

  ionViewWillEnter() {
    // console.log(this.currentResults[0]);
    // console.log(this.currentResults[1]);
    // console.log(this.currentTeams);
  }

  // 提交比赛结果
  doSubmitResult() {
    console.log("本场比赛的结果是", this.currentResults);
    const loading = this.loadCtrl.create({
      content: '提交数据中...'
    });
    loading.present();
    this.api.post('results/insertMany', this.currentResults).subscribe(data => {
      loading.dismiss();
      this.matchService.setMatchInfo(data);
      this.navCtrl.pop();
      // console.log(data);
      // console.log("本场比赛的matchId", this.matchId);
      // console.log("本场比赛的gameRule", this.match.gameRule);
    }, (error) => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: '错误',
        subTitle: `提交比赛记录失败, ${error}`,
        buttons: ['确定']
      });
      alert.present();
    });
  }
}
