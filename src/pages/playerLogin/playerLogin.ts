import { Component } from "@angular/core"
import { NavController } from 'ionic-angular';
import { PlayersPreparePage } from '../playersPrepare/playersPrepare';

@Component({
  selector: 'page-playerLogin',
  templateUrl: 'playerLogin.html'
})

export class PlayerLoginPage {
  constructor(public navCtrl: NavController) {

  }

  inputPlayerID() {
    this.navCtrl.push(PlayersPreparePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Player Login page.');
  }
}
