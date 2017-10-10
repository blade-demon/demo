import { Component, NgZone } from "@angular/core"
import { Events, NavController, ToastController, AlertController, ModalController, NavParams } from 'ionic-angular';
import { RecordResultPage } from '../record-result/record-result';
import { PlayerCreatePage } from '../player-create/player-create';
import { TeamSelectPage } from '../team-select/team-select';
import { MatchServiceProvider } from '../../providers/match-service/match-service';
import { Match } from '../../models/match';

@Component({
  selector: 'page-match-create',
  templateUrl: 'match-create.html'
})

export class MatchCreatePage {
  tournament: any;
  team: any;
  match: Match;
  // matchCount: number;
  gameRule: string;
  players: any[];
  resultDataTemplte: any;

  constructor(
    public events: Events,
    private zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    public matchService: MatchServiceProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

    this.players = [];
    this.resultDataTemplte = {
      "player1": {
        "playerId": "",
        "teamId": "",
        "score": 0,
        "gotShots": 0,
        "shotTimes": 0,
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
        "remainingPauses": 0
      }, "player2": {
        "playerId": "",
        "teamId": "",
        "score": 0,
        "gotShots": 0,
        "shotTimes": 0,
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
        "remainingPauses": 0
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
          "teamId": "",
          "score": 0,
          "gotShots": 0,
          "shotTimes": 0,
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
          "remainingPauses": 0
        }, "player2": {
          "playerId": "",
          "teamId": "",
          "score": 0,
          "gotShots": 0,
          "shotTimes": 0,
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
          "remainingPauses": 0
        }
      }]
    }
  }

  gameRuleChange(data: string) {
    let matchLength = Number(data.slice(2));
    // this.matchCount = matchLength;
    // this.match.results.push(this.resultDataTemplte);
    // console.log(this.matchCount);
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
    const alert = this.alertCtrl.create({
      title: '提示',
      subTitle: '你确定要放弃当前的比赛吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消放弃');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('放弃当前比赛');
            this.events.publish('updateScreen');
          }
        }
      ]
    });
    alert.present();
  }

  getProfileImageStyle() {
    console.log("获取选手的头像");
  }

  inputPlayerID() {
    // this.navCtrl.push(PlayersPreparePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Player Login page.');
  }

  ionViewWillEnter() {
    //获取赛事信息
    this.tournament = this.navParams.get("tournament");
    // var data = this.matchService.getMatchInfo();
    // console.log("enter: ", data.players);
    // this.players = data.players;
    // console.log(this.players);
  }

  // 记录比赛详细数据
  onRecordResult() {
    console.log("详细记录比赛数据");
    this.navCtrl.push(RecordResultPage);
  }

  // 确认是否保存数据
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();
  }

  presentAlertAbortMatch() {

  }
}
