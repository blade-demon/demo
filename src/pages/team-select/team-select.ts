import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { NBATeamsService } from '../../providers/nbateams.service';
@Component({
  selector: 'page-team-select',
  templateUrl: 'team-select.html'
})

export class TeamSelectPage {
  teams: {index, name, image}[] = [];
  selectedTeam: any;
  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public navParams: NavParams,
              private nbateamsservice: NBATeamsService) {
    this.teams = this.nbateamsservice.getNBATeams();
    // console.log(this.nbateamsservice.getNBATeams());
  }

  selectTeam(team: NavParams) {
    this.selectedTeam = team;
    this.viewCtrl.dismiss(this.selectedTeam);
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }
}
