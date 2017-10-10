import { Component, NgZone } from "@angular/core"
import { Events, NavController, ToastController, AlertController, ModalController, NavParams } from 'ionic-angular';
import { RecordResultPage } from '../record-result/record-result';
import { PlayerCreatePage } from '../player-create/player-create';
import { TeamSelectPage } from '../team-select/team-select';
import { MatchServiceProvider } from '../../providers/match-service/match-service';
import { Match} from '../../models/match';

@Component({
  selector: 'page-match-create',
  templateUrl: 'match-create.html'
})

export class MatchCreatePage {
  match: Match;
  // 比赛规则
  gameRule: string;
  // 赛事信息
  tournament: any;
  // 比赛信息
  matches: any[] = [];
  // 球员信息
  players: any[] = [];
  // 球队模态框
  teamsModal1: any;
  teamsModal2: any;

  constructor(
    public events: Events,
    private zone: NgZone,
    public navCtrl: NavController,
    public navParams: NavParams,
    public matchService: MatchServiceProvider,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

    this.match = new Match();
    console.log(this.match);

    this.events.subscribe('updateScreen', () => {
      this.zone.run(() => {
        location.reload();
      });
    });

    // 默认BO1
    this.matches.push({ matchIndex: 1 });
    this.gameRule = "BO1";
    //
    // 球队模态框初始化
    this.teamsModal1 = this.modalCtrl.create(TeamSelectPage);
    this.teamsModal2 = this.modalCtrl.create(TeamSelectPage);


    this.teamsModal1.onDidDismiss(data => {
      console.log("Player1选择的Team是：" + JSON.stringify(data.selectedTeam));
      // this.matchService.selectTeamForPlayer1(data.selectedTeam);
    });

    this.teamsModal2.onDidDismiss(data => {
      console.log("Player2选择的Team是：" + JSON.stringify(data.selectedTeam));
      // this.matchService.selectTeamForPlayer2(data.selectedTeam);
    });
  }

  gameRuleChagne(data: string) {
    console.log("select change", data);
    let matchLength = Number(data.slice(2));
    // this.match.matches = this.matches;
    this.matches = [];
    for (let i = 0; i < matchLength; i++) {
      this.matches.push({
        index: i + 1
      });
    }
  }

  // 添加选手
  selectPlayer(playerIndex) {
    const modal = this.modalCtrl.create(PlayerCreatePage);
    // modal.onDidDismiss((data)=> {
    //   console.log("选手" + playerIndex + "是:" + data);
    // });
    modal.present();
  }

  // 选手1选择球队
  selectTeamForPlayer1(match, matchIndex) {
    console.log(match);
    this.teamsModal1.present();
  }

  // 选手2选择球队
  selectTeamForPlayer2(match, matchIndex) {
    console.log(match);
    this.teamsModal2.present();
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
    console.log(this.players);
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
