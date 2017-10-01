import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Player } from '../../models/Player';
import { Players } from '../../services/providers';
import { Api } from '../../services/api/api';

@IonicPage()
@Component({
  selector: 'page-player-create',
  templateUrl: 'player-create.html',
})
export class PlayerCreatePage {
  userInput: { id: string };
  currentPlayers: Player[] = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private api: Api,
              public players: Players) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlayerCreatePage');
  }

  ionViewWillEnter() {
    console.log("进入添加选手界面");
    this.api.get('players').subscribe(data => {
      this.players = data.json();
      console.log(this.players);
    })
  }

  shouldShowCancel() {
    console.log("显示取消按钮");
  }

  getPlayers(ev) {
    console.log("开始输入", ev.target.value);
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentPlayers = [];
      return;
    }
    this.currentPlayers = this.players.query({
      "gamepochPlayerId": val
    });
  }

  onCancel() {
    console.log("取消输入");
  }

}
