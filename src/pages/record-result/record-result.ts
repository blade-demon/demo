import {Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-record-result',
  templateUrl: 'record-result.html'
})

export class RecordResultPage {
  matchInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.matchInfo = navParams.get("matchInfo");
    console.log(this.matchInfo);
  }
}
