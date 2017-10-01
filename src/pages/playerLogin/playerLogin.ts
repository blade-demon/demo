import { Component } from "@angular/core"
import { NavController, NavParams } from 'ionic-angular';
import { PlayersPreparePage } from '../playersPrepare/playersPrepare';
import { PlayerCreatePage} from '../player-create/player-create';
@Component({
  selector: 'page-playerLogin',
  templateUrl: 'playerLogin.html'
})

export class PlayerLoginPage {
  match: { name, location, time, desc, status, coverImg }[] = [];
  players: { index, nickname, name, userid, headimg }[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  // 添加选手
  addPlayer() {
    this.navCtrl.push(PlayerCreatePage);
  }

  getProfileImageStyle() {
    console.log("获取选手的头像");
  }

  inputPlayerID() {
    this.navCtrl.push(PlayersPreparePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Player Login page.');
  }

  ionViewWillEnter() {
    this.match = this.navParams.get("match");
    // this.players = [{
    //   index: 0,
    //   name: "张三丰",
    //   nickname: "篮球2号机器人",
    //   userid: "65839873",
    //   headimg: "http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-buzz.png"
    // }, {
    //   index: 1,
    //   name: "张杰",
    //   nickname: "篮球1号机器人",
    //   userid: "12752100",
    //   headimg: "http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-potatohead.png"
    // }];
    // console.log(this.players);
  }
}
