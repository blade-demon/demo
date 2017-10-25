import { Component } from '@angular/core';
import 'rxjs/add/operator/map';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { MatchCreatePage } from '../match-create/match-create';
import { Api } from "../../providers/api/api";
import { PlayersProvider } from '../../providers/providers';
import { TournamentsProvider } from '../../providers/providers';
import { Storage } from '@ionic/storage';

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
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private playersProvider : PlayersProvider,
    private tournamentsProvider : TournamentsProvider,
    private storage: Storage) {
      this.storage.remove('matchResult');
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: '加载数据中...'
    });
    loading.present();
    this.tournamentsProvider.query().subscribe(tournaments => {
      this.playersProvider.query().subscribe(players => {
        this.storage.set("players", JSON.stringify(players));
        this.tours = tournaments;
        loading.dismiss();
      });
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
