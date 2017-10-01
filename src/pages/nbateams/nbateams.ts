import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { NBATeamsService } from '../../services/nbateams.service';
@Component({
  selector: 'page-nbateams',
  templateUrl: 'nbateams.html'
})

export class NBATeamsPage {
  nbateams: {name, image}[] = [];
  selectedTeam: any;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private nbateamsservice: NBATeamsService) {
    this.nbateams = this.nbateamsservice.getNBATeams();
    console.log(this.nbateamsservice.getNBATeams());
  }

  selectTeam(team: NavParams) {
    this.selectedTeam = team;
    this.viewCtrl.dismiss({selectedTeam: this.selectedTeam});
  }

  dismiss() {
    this.viewCtrl.dismiss({selectedTeam: null});
  }
}
