import { Component } from '@angular/core';

import { DataPage } from '../data/data';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DataPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
