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
        "matchId": "",
        "playerId": "",
        "teamId": "",
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
      "results": [{
        "player1": {
          "playerId": "",
          "matchId": "",
          "teamId": "",
          "matchIndex": 0,
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
          "matchIndex": 0,
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
      }]
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
        message: '确定要放弃当前比赛记录吗？',
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
              console.log('Agree clicked');
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
    //获取赛事信息
    this.tournament = this.navParams.get("tournament");
    this.matchService.getMatchInfo().then(data => {
      this.matchId = data;
      console.log(this.matchId);
      this.api.get('results', { matchId: this.matchId }).subscribe((data) => {
        console.log(data);
        var results = data;
      }, (error) => {
        console.log(error);
      })
    }, (error) => {
      console.log(error);
    });
  }

  // 记录比赛详细数据
  onRecordResult(index) {
    console.log("详细记录比赛数据");
    this.match.results[index].player1.matchId = this.matchId;
    this.match.results[index].player2.matchId = this.matchId;
    this.navCtrl.push(RecordResultPage, { index: index, match: this.match, gameRule: this.match.gameRule });
  }
}
