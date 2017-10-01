import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NBATeamsPage } from '../nbateams/nbateams';
import { GameCompletePage } from '../gameComplete/gameComplete';
import { NBATeamsService } from '../../services/nbateams.service';
class PlayerPrepareInfo {
  playername: string;
  playerId: string;
  playerimage: string;
  team: string;
  image: string;
  teamIndex: number;
}

@Component({
  selector: 'page-playersPrepare',
  templateUrl: 'playersPrepare.html',
})

export class PlayersPreparePage {
  player1Info: PlayerPrepareInfo = {
    playername: '张三',
    playerId: "1234",
    playerimage: "../../assets/img/avatar_placeholder.jpg",
    team: '尚未选择球队',
    image: "../../assets/img/team_placeholder.jpg",
    teamIndex: -1
  };

  player2Info: PlayerPrepareInfo = {
    playername: '李四',
    playerId: "5664",
    playerimage: "../../assets/img/avatar_placeholder.jpg",
    team: '尚未选择球队',
    image: "../../assets/img/team_placeholder.jpg",
    teamIndex: -1
  };
  teamsModalFor1: any;
  teamsModalFor2: any;
  MatchRule: any;
  nbateams: {name, image}[] = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private nbateamsservice: NBATeamsService) {

    this.nbateams = this.nbateamsservice.getNBATeams();
    console.log(this.nbateamsservice.getNBATeams());

    this.MatchRule = "BO1";
    this.teamsModalFor1 = this.modalCtrl.create(NBATeamsPage);
    this.teamsModalFor2 = this.modalCtrl.create(NBATeamsPage);

    this.teamsModalFor1.onDidDismiss(data => {
      // console.log("Player1选择的Team是：" + JSON.stringify(data.selectedTeam));
      this.player1Info.team = data.selectedTeam.name;
      this.player1Info.image = data.selectedTeam.image,
      this.player1Info.teamIndex = data.selectedTeam.index
    });

    this.teamsModalFor2.onDidDismiss(data => {
      // console.log("Player2选择的Team是：" + JSON.stringify(data.selectedTeam));
      this.player2Info.team = data.selectedTeam.name;
      this.player2Info.image = data.selectedTeam.image;
      this.player2Info.teamIndex = data.selectedTeam.index;
    });
  }

  // 打开modal显示球队选择列表
  openModalSelectTeamFor1() {
    this.teamsModalFor1.present();
  }

  openModalSelectTeamFor2() {
    this.teamsModalFor2.present();
  }

  // 开始游戏
  startGame() {
    // console.log("开始游戏！");
    this.navCtrl.push(GameCompletePage, {
      matchInfo: {
        matchRule: this.MatchRule,
        player1Info: this.player1Info,
        player2Info: this.player2Info
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad 选手球队选择界面.');
  }
}
