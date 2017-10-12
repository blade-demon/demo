import { Component } from "@angular/core"
import { NavController, ToastController, AlertController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { RecordResultPage } from '../record-result/record-result';
import { PlayerCreatePage } from '../player-create/player-create';
import { TeamSelectPage } from '../team-select/team-select';
import { MatchServiceProvider } from '../../providers/match-service/match-service';
import { Match } from '../../models/match';
import { NBATeamsService } from '../../providers/nbateams.service';
import { Api } from "../../providers/api/api";

@Component({
  selector: 'page-match-create',
  templateUrl: 'match-create.html'
})

export class MatchCreatePage {
  teams: any[];
  tournament: any;
  team: any;
  match: Match;
  // matchCount: number;
  gameRule: string;
  players: any[];
  resultDataTemplte: any;

  matchId: string;
  matchFinalResult: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nbateamsservice: NBATeamsService,
    public matchService: MatchServiceProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public api: Api) {

    this.teams = this.nbateamsservice.getNBATeams();
    this.players = [];
    this.resultDataTemplte = {
      "player1": {
        "playerId": "",
        "matchId": "",
        "teamId": "",
        "matchIndex": -1,
        "score": 0,
        "gotShots": 0,
        "shots": 0,
        "gotThreePointsShots": 0,
        "threePointsShots": 0,
        "gotPenaltyShots": 0,
        "penaltyShots": 0,
        "fastBreakScore": 0,
        "freeThrowLaneScore": 0,
        "secondAttackScore": 0,
        "substituteScore": 0,
        "assists": 0,
        "offensiveRebounds": 0,
        "defensiveRebounds": 0,
        "steals": 0,
        "blockShots": 0,
        "turnovers": 0,
        "turnoverScores": 0,
        "teamFouls": 0,
        "maxLeadScore": 0,
        "possessionTime": "0",
        "remainingPauses": 0,
        "win": false
      }, "player2": {
        "matchId": "",
        "playerId": "",
        "teamId": "",
        "matchIndex": -1,
        "score": 0,
        "gotShots": 0,
        "shots": 0,
        "gotThreePointsShots": 0,
        "threePointsShots": 0,
        "gotPenaltyShots": 0,
        "penaltyShots": 0,
        "fastBreakScore": 0,
        "freeThrowLaneScore": 0,
        "secondAttackScore": 0,
        "substituteScore": 0,
        "assists": 0,
        "offensiveRebounds": 0,
        "defensiveRebounds": 0,
        "steals": 0,
        "blockShots": 0,
        "turnovers": 0,
        "turnoverScores": 0,
        "teamFouls": 0,
        "maxLeadScore": 0,
        "possessionTime": "0",
        "remainingPauses": 0,
        "win": false
      }
    };

    this.match = {
      "tournamentId": "",
      "gameRule": "BO1",
      "playersId": ["", ""],
      "date": "",
      "results": [this.resultDataTemplte]
    }
  }

  // 添加选手
  selectPlayer(playerIndex) {
    const modal = this.modalCtrl.create(PlayerCreatePage);
    modal.onDidDismiss((player) => {
      if (player) {
        // console.log(`选手${playerIndex}是: ${player.name}`);
        this.match.playersId[playerIndex - 1] = player.gamepochPlayerId;
        this.players[playerIndex - 1] = player;
        console.log(this.match);
      } else {
        // console.log(`选手${playerIndex}为空`);
      }
    });
    modal.present();
  }

  // 选择球队
  selectTeam(playerIndex, matchIndex) {
    const modal = this.modalCtrl.create(TeamSelectPage);
    modal.onDidDismiss((team) => {
      if (team) {
        console.log(`在第${matchIndex + 1}局比赛中，选手${playerIndex}选择的球队是，${team.name}`);
        if (!playerIndex) {
          // 第matchIndex+1场比赛的选手1的选手Id
          this.match.results[matchIndex].player1.playerId = this.match.playersId[playerIndex];
          // 第matchIndex+1场比赛的选手1的选手的队伍
          this.match.results[matchIndex].player1.teamId = team.index;
          console.log(team.index);
        } else {
          // 第matchIndex+1场比赛的选手2的选手Id
          this.match.results[matchIndex].player2.playerId = this.match.playersId[playerIndex];
          // 第matchIndex+1场比赛的选手2的选手的队伍
          this.match.results[matchIndex].player2.teamId = team.index;
        }
      } else {
        console.log(`在第${matchIndex + 1}局比赛中，选手${playerIndex}选择的球队为空`);
      }
    })
    modal.present();
  }

  // 添加新的比赛纪录
  addNewMatch() {
    if (this.matchId) {
      let confirm = this.alertCtrl.create({
        title: '注意',
        message: '确定要新建比赛记录吗？',
        buttons: [
          {
            text: '取消',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: '确定',
            handler: () => {
              // 初始化服务
              this.matchService.initialMatchInfo();
              // 初始化数据
              this.initialData();
              const alert = this.alertCtrl.create();
              alert.setTitle('选择赛制');

              alert.addInput({
                type: 'radio',
                label: 'BO1',
                value: 'BO1',
                checked: true
              });
              alert.addInput({
                type: 'radio',
                label: 'BO3',
                value: 'BO3',
                checked: false
              });
              alert.addInput({
                type: 'radio',
                label: 'BO5',
                value: 'BO5',
                checked: false
              });
              alert.addButton({
                text: '取消'
              });
              alert.addButton({
                text: '确定',
                handler: data => {
                  const loading = this.loadingCtrl.create({
                    content: '创建比赛中...'
                  });
                  loading.present();
                  this.api.post('matches', {
                    "tournamentId": this.tournament,
                    "gameRule": data
                  }).subscribe(data => {
                    loading.dismiss();
                    this.matchId = data.json()._id;
                    this.match.gameRule = data.json().gameRule;
                    console.log("本场比赛的matchId", this.matchId);
                    console.log("本场比赛的gameRule", this.match.gameRule);
                  }, (error) => {
                    loading.dismiss();
                    const alert = this.alertCtrl.create({
                      title: '错误',
                      subTitle: `创建比赛记录失败, ${error}`,
                      buttons: ['确定']
                    });
                    alert.present();
                  });
                }
              });
              alert.present();
            }
          }
        ]
      });
      confirm.present();
    } else {
      const alert = this.alertCtrl.create();
      alert.setTitle('选择赛制');

      alert.addInput({
        type: 'radio',
        label: 'BO1',
        value: 'BO1',
        checked: true
      });
      alert.addInput({
        type: 'radio',
        label: 'BO3',
        value: 'BO3',
        checked: false
      });
      alert.addInput({
        type: 'radio',
        label: 'BO5',
        value: 'BO5',
        checked: false
      });
      alert.addButton({
        text: '取消'
      });
      alert.addButton({
        text: '确定',
        handler: data => {
          const loading = this.loadingCtrl.create({
            content: '创建比赛中...'
          });
          loading.present();
          this.api.post('matches', {
            "tournamentId": this.tournament,
            "gameRule": data
          }).subscribe(data => {
            loading.dismiss();
            this.matchId = data.json()._id;
            this.match.gameRule = data.json().gameRule;
            this.matchService.setMatchInfo(this.matchId);
            console.log("本场比赛的matchId", this.matchId);
            console.log("本场比赛的gameRule", this.match.gameRule);
          }, (error) => {
            loading.dismiss();
            const alert = this.alertCtrl.create({
              title: '错误',
              subTitle: `创建比赛记录失败, ${error}`,
              buttons: ['确定']
            });
            alert.present();
          });
        }
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Player Login page.');
  }

  ionViewWillEnter() {
    this.matchService.getMatchInfo().then(data => {
      if(data) {
        // 已存在缓存比赛结果
        console.log("已缓存的比赛数据：" + data);
        this.matchId = data[0].matchId;
        let matchCount = this.getMatchCount();
        let currentMatchCount = data.length/2;
        console.log("matchCount", matchCount);
        console.log("currentMatchCount", currentMatchCount);
        if(matchCount >= currentMatchCount) {
          console.log("已记录比赛记录", this.match.results);
          this.addNewResult( this.match.results);
          console.log("待更新比赛记录", this.match.results);
        }
        this.matchService.getTournament().then(data => {
          this.tournament = JSON.parse(data);
        });
        console.log(this.tournament);
      } else {
        // 新比赛
        this.tournament = this.navParams.get("tournament");
        console.log(this.tournament);
        this.matchService.setTournament(JSON.stringify(this.tournament));
      }
    }, (error) => {
      console.log(error);
    });
  }

  // 记录比赛详细数据
  onRecordResult(index) {
    console.log("详细记录比赛数据");
    this.match.results[index].player1.matchId = this.matchId;
    this.match.results[index].player2.matchId = this.matchId;
    this.match.results[index].player1.matchIndex = index;
    this.match.results[index].player2.matchIndex = index;
    this.navCtrl.push(RecordResultPage, { index: index, match: this.match });
  }

  getMatchCount() {
    console.log(this.match.gameRule);
    return Number(this.match.gameRule.slice(2));
  }

  // 确定是否添加比赛
  addNewResult(data){
    let gameCount = this.getMatchCount();
    let p1WinCount = 0;
    let p2WinCount = 0;
    for(let i = 0; i < data.length; i++) {
      if(data[i].player1.win) {
        p1WinCount++;
      } else {
        p2WinCount++;
      }
    }
    let winCount = Math.floor(gameCount/2) + 1;
    console.log("选手1赢得比赛次数：", p1WinCount);
    console.log("选手2赢得比赛次数：", p2WinCount);
    console.log("需要赢得的比赛次数为：", winCount);
    if(p1WinCount < winCount && p2WinCount < winCount) {
      this.match.results.push({
        "player1": {
          "playerId": "",
          "matchId": "",
          "teamId": "",
          "matchIndex": -1,
          "score": 0,
          "gotShots": 0,
          "shots": 0,
          "gotThreePointsShots": 0,
          "threePointsShots": 0,
          "gotPenaltyShots": 0,
          "penaltyShots": 0,
          "fastBreakScore": 0,
          "freeThrowLaneScore": 0,
          "secondAttackScore": 0,
          "substituteScore": 0,
          "assists": 0,
          "offensiveRebounds": 0,
          "defensiveRebounds": 0,
          "steals": 0,
          "blockShots": 0,
          "turnovers": 0,
          "turnoverScores": 0,
          "teamFouls": 0,
          "maxLeadScore": 0,
          "possessionTime": "0",
          "remainingPauses": 0,
          "win": false
        }, "player2": {
          "matchId": "",
          "playerId": "",
          "teamId": "",
          "matchIndex": -1,
          "score": 0,
          "gotShots": 0,
          "shots": 0,
          "gotThreePointsShots": 0,
          "threePointsShots": 0,
          "gotPenaltyShots": 0,
          "penaltyShots": 0,
          "fastBreakScore": 0,
          "freeThrowLaneScore": 0,
          "secondAttackScore": 0,
          "substituteScore": 0,
          "assists": 0,
          "offensiveRebounds": 0,
          "defensiveRebounds": 0,
          "steals": 0,
          "blockShots": 0,
          "turnovers": 0,
          "turnoverScores": 0,
          "teamFouls": 0,
          "maxLeadScore": 0,
          "possessionTime": "0",
          "remainingPauses": 0,
          "win": false
        }
      });
    } else {
      this.matchFinalResult = p1WinCount > p2WinCount ? `选手1获胜` : `选手2获胜`;
    }
  }

  // 初始化数据
  initialData() {
    this.players = [];
    this.resultDataTemplte = {
      "player1": {
        "playerId": "",
        "matchId": "",
        "teamId": "",
        "matchIndex": -1,
        "score": 0,
        "gotShots": 0,
        "shots": 0,
        "gotThreePointsShots": 0,
        "threePointsShots": 0,
        "gotPenaltyShots": 0,
        "penaltyShots": 0,
        "fastBreakScore": 0,
        "freeThrowLaneScore": 0,
        "secondAttackScore": 0,
        "substituteScore": 0,
        "assists": 0,
        "offensiveRebounds": 0,
        "defensiveRebounds": 0,
        "steals": 0,
        "blockShots": 0,
        "turnovers": 0,
        "turnoverScores": 0,
        "teamFouls": 0,
        "maxLeadScore": 0,
        "possessionTime": "0",
        "remainingPauses": 0,
        "win": false
      }, "player2": {
        "matchId": "",
        "playerId": "",
        "teamId": "",
        "matchIndex": -1,
        "score": 0,
        "gotShots": 0,
        "shots": 0,
        "gotThreePointsShots": 0,
        "threePointsShots": 0,
        "gotPenaltyShots": 0,
        "penaltyShots": 0,
        "fastBreakScore": 0,
        "freeThrowLaneScore": 0,
        "secondAttackScore": 0,
        "substituteScore": 0,
        "assists": 0,
        "offensiveRebounds": 0,
        "defensiveRebounds": 0,
        "steals": 0,
        "blockShots": 0,
        "turnovers": 0,
        "turnoverScores": 0,
        "teamFouls": 0,
        "maxLeadScore": 0,
        "possessionTime": "0",
        "remainingPauses": 0,
        "win": false
      }
    };

    this.match = {
      "tournamentId": "",
      "gameRule": "BO1",
      "playersId": ["", ""],
      "date": "",
      "results": [this.resultDataTemplte]
    }
    this.matchFinalResult = "";
  }

}
