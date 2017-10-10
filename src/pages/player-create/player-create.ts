import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { Player } from '../../models/Player';
import { PlayersProvider } from '../../providers/providers';
import { Api } from '../../providers/api/api';
// import { PlayerDetailPage } from '../player-detail/player-detail';
import { MatchServiceProvider } from '../../providers/match-service/match-service';

@Component({
  selector: 'page-player-create',
  templateUrl: 'player-create.html',
})
export class PlayerCreatePage {
  userInput: { id: string };
  players: PlayersProvider;
  currentPlayers: Player[] = [];
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private api: Api,
    private matchService : MatchServiceProvider) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlayerCreatePage');
  }

  ionViewWillEnter() {
    console.log("进入添加选手界面");
    this.api.get('players').subscribe(data => {
      this.players = data.json();
      console.log(this.players);
    });
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
    // 通过GamepochPlayerId进行筛选
    this.currentPlayers = this.findByPlayerId(playersArray, { gamepochPlayerId: val });
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
    this.matchService.addAsPlayer(player, index, matchIndex);
    this.viewCtrl.dismiss();
  }
}
