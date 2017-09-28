import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlayerLoginPage } from '../playerLogin/playerLogin';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public event = {
    month: '2017-10-01'
  }
  constructor(public navCtrl: NavController) {

  }

  LoadPlayerLoginPage() {
    this.navCtrl.push(PlayerLoginPage);
  }
}
