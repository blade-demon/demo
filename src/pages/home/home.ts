import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any[];
  public event = {
    month: '2017-10-01'
  }
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    this.items = [];
    for(let i= 0; i < 10; i++) {
      this.items.push({
        text: 'Item' + i,
        id: i
      });
    }
  }

  itemSelected(item) {
    this.navCtrl.push(DetailPage, {item: item})
    // this.presentToast(item.text);
  }

  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
