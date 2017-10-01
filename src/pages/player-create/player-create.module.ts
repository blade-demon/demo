import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerCreatePage } from './player-create';

@NgModule({
  declarations: [
    PlayerCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerCreatePage),
  ],
})
export class PlayerCreatePageModule {}
