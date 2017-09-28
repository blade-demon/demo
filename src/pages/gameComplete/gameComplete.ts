import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-gamecomplete',
  templateUrl: 'gameComplete.html'
})

export class GameCompletePage {
  matchInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchInfo = navParams.get("matchInfo");
    console.log(this.matchInfo);
  }
}
