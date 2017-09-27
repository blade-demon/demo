import {Component} from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-nbateams',
  templateUrl: 'nbateams.html'
})

export class NBATeamsPage {
  teams: any[];
  constructor(public navCtrl: NavController) {
    this.teams = [];
    for(let i = 0; i < 30; i++) {
      this.teams.push({
        name: '',
        id: i + 1
      });
    }
  }

}
