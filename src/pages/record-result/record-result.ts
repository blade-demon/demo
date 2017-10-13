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
    public api: Api) {

    this.teams = this.nbateamservice.getNBATeams();
    this.matchInfo = this.navParams.get("match");
    this.resultIndex = this.navParams.get("index");
    this.gameRule = this.matchInfo.gameRule;
    this.matchId = this.matchInfo.results[0].player1.matchId;

    this.currentTeams = [];
    this.currentTeams[0] = this.teams[this.matchInfo.results[this.resultIndex].player1.teamId - 1];
    this.currentTeams[1] = this.teams[this.matchInfo.results[this.resultIndex].player2.teamId - 1];

    this.currentResults = [];
    this.currentResults[0] = this.matchInfo.results[this.resultIndex].player1;
    this.currentResults[1] = this.matchInfo.results[this.resultIndex].player2;

    console.log(this.matchInfo);
  }

  ionViewWillEnter() {}

  // 提交比赛结果
  doSubmitResult() {
    // console.log("本场比赛的结果是", this.currentResults);
    // 确定本场比赛输赢
    if( Number(this.currentResults[0].score) > Number(this.currentResults[1].score)) {
      this.currentResults[0].win = true;
    } else {
      this.currentResults[1].win = true;
    }
    // 上传输据
    const loading = this.loadCtrl.create({ content: '提交数据中...' });
    loading.present();
    this.api.post('results/insertMany', this.currentResults).subscribe(data => {
      loading.dismiss();
      // 传递服务器返回的比赛存储数据
      this.matchService.setMatchInfo(data.json());
      this.navCtrl.pop();
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
