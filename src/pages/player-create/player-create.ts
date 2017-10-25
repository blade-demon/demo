import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Player } from '../../models/Player';
import { PlayersProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-player-create',
  templateUrl: 'player-create.html',
})
export class PlayerCreatePage {
  userInput: { id: string };
  players: any;
  currentPlayers: Player[] = [];
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private storage: Storage,
    private playersProvider: PlayersProvider) {}

  ionViewDidLoad() {}

  ionViewWillEnter() {
    console.log("进入添加选手界面");
    this.storage.get("players").then(
      players => this.players = JSON.parse(players),
      error => console.log(error)
    );
  }

  shouldShowCancel() {
    console.log("显示取消按钮");
  }

  getPlayers(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentPlayers = [];
      return;
    }
    let playersArray = [];
    for (let index in this.players) {
      playersArray.push(this.players[index]);
    }
    // 通过celid进行筛选
    this.currentPlayers = this.findByPlayerId(playersArray, { celid: val });
  }

  onCancel() {
    // console.log("取消输入");
  }

  // 查找选手
  findByPlayerId(players, params?: any) {
    if (!params) {
      return players;
    }

    return players.filter((player) => {
      for (let key in params) {
        let field = player[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return player;
        } else if (field == params[key]) {
          return player;
        }
      }
      return null;
    });
  }

  // 查看选手详细信息
  choosePlayer(player, index, matchIndex) {
    console.log("将选手" + (index + 1) + "作为参赛者：",player);
    this.viewCtrl.dismiss(player);
  }
}
