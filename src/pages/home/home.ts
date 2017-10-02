import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController, AlertController } from 'ionic-angular';
import { NewMatchPage } from '../new-match/new-match';
import { Api } from "../../providers/api/api";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  matches: { name, location, time }[] = [];
  public event = {
    month: '2017-10-01'
  }
  constructor(public navCtrl: NavController,
    private api: Api,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    console.log("进入首页,获取赛事信息");
    this.api.get('matches').subscribe(data => {
      this.matches = data.json();
    })
  }

  onSelectMatch(item) {
    if (item.status === '进行中') {
      this.navCtrl.push(NewMatchPage, { tournament: item });
    } else {
      this.presentAlert(item.status);
    }
  }

  presentAlert(text:string) {
    const alert = this.alertCtrl.create({
      title: `比赛${text}`,
      subTitle: '',
      buttons: ['确定']
    });
    alert.present();
  }
}
