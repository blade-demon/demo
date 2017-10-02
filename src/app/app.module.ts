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
import { DataPage } from '../pages/data/data';
import { SettingsPage } from '../pages/settings/settings';
import { DetailPage } from '../pages/detail/detail';
import { TeamSelectPage } from '../pages/team-select/team-select';
import { NewMatchPage } from '../pages/new-match/new-match';
import { PlayerCreatePage } from '../pages/player-create/player-create';
import { PlayerDetailPage } from '../pages/player-detail/player-detail';
import { PlayersPreparePage } from '../pages/playersPrepare/playersPrepare';
import { RecordResultPage } from '../pages/record-result/record-result';

import { Players } from '../providers/players/players';
import { Matches } from '../providers/matches/matches';
import { Results } from '../providers/results/results';

import { Api } from '../providers/providers';
import { NBATeamsService } from '../providers/nbateams.service';
import { MatchServiceProvider } from '../providers/match-service/match-service';
import { TournamentServiceProvider } from '../providers/tournament-service/tournament-service';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DataPage,
    SettingsPage,
    DetailPage,
    TeamSelectPage,
    NewMatchPage,
    PlayerCreatePage,
    PlayerDetailPage,
    PlayersPreparePage,
    RecordResultPage,
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
    DataPage,
    SettingsPage,
    DetailPage,
    TeamSelectPage,
    NewMatchPage,
    PlayerDetailPage,
    PlayerCreatePage,
    PlayersPreparePage,
    RecordResultPage
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
    NBATeamsService,
    MatchServiceProvider,
    TournamentServiceProvider
  ]
})
export class AppModule { }
