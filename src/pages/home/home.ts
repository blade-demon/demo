import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MatchCreatePage } from '../match-create/match-create';
import { Api } from "../../providers/api/api";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tours: { name, location, time }[] = [];
  public event = {
    month: '2017-10-01'
  }
  constructor(public navCtrl: NavController,
    private api: Api,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: '加载数据中...'
    });
    loading.present();
    this.api.get('tournaments').subscribe(data => {
      loading.dismiss();
      this.tours = data.json();
    }, (error) => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: '错误',
        subTitle: `获取数据失败, ${error}`,
        buttons: ['确定']
      });
      alert.present();
    });
  }

  onSelectTour(tour) {
    if (tour.status === '进行中') {
      this.navCtrl.push(MatchCreatePage, { tournament: tour });
    } else {
      this.presentAlert(tour.status);
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
