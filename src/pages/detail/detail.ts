import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})

export class DetailPage {
  item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.item);
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
}
