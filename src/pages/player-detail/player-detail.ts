import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Player } from '../../models/player';
import { MatchCreatePage } from '../match-create/match-create';

@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
})
export class PlayerDetailPage {
  player: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.player = navParams.get('player');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailPage');
  }

  ionViewWillEnter() {
    this.player = this.navParams.get('player');
    console.log(this.player);
  }

  onAddToMatch() {
    console.log("添加至比赛");
    this.navCtrl.popTo(MatchCreatePage);
  }
}
