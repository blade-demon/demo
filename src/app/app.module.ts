import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { TabsPage} from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { DetailPage } from '../pages/detail/detail';
import { NBATeamsPage } from '../pages/nbateams/nbateams';
import { PlayerLoginPage } from '../pages/playerLogin/playerLogin';
import { PlayerCreatePage } from '../pages/player-create/player-create';
import { PlayersPreparePage } from '../pages/playersPrepare/playersPrepare';
import { GameCompletePage } from '../pages/gameComplete/gameComplete';

// 比赛选手
import { Players } from '../mocks/providers/players';
// 新建比赛
import { Matches } from '../mocks/providers/matches';
// 比赛结果
import { Results } from '../mocks/providers/results';
import { Api } from '../services/providers';

// import { MatchesService } from '../services/matches.service';
import { NBATeamsService } from '../services/nbateams.service';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    SearchPage,
    SettingsPage,
    DetailPage,
    NBATeamsPage,
    PlayerLoginPage,
    PlayerCreatePage,
    PlayersPreparePage,
    GameCompletePage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    SearchPage,
    SettingsPage,
    DetailPage,
    NBATeamsPage,
    PlayerLoginPage,
    PlayerCreatePage,
    PlayersPreparePage,
    GameCompletePage
  ],
  providers: [
    Api,
    Players,
    Results,
    Matches,
    Camera,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // MatchesService,
    NBATeamsService
  ]
})
export class AppModule { }
