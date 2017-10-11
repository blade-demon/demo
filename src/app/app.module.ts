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
import { MatchCreatePage } from '../pages/match-create/match-create';
import { PlayerCreatePage } from '../pages/player-create/player-create';
import { PlayerDetailPage } from '../pages/player-detail/player-detail';
import { PlayersPreparePage } from '../pages/playersPrepare/playersPrepare';
import { RecordResultPage } from '../pages/record-result/record-result';

import { PlayersProvider } from '../providers/players/players';
import { MatchesProvider } from '../providers/matches/matches';
import { ResultsProvider } from '../providers/results/results';

import { Api } from '../providers/providers';
import { NBATeamsService } from '../providers/nbateams.service';
import { MatchServiceProvider } from '../providers/match-service/match-service';
import { TournamentsProvider } from '../providers/tournaments/tournaments';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DataPage,
    SettingsPage,
    DetailPage,
    TeamSelectPage,
    MatchCreatePage,
    PlayerCreatePage,
    PlayerDetailPage,
    PlayersPreparePage,
    RecordResultPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
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
    MatchCreatePage,
    PlayerDetailPage,
    PlayerCreatePage,
    PlayersPreparePage,
    RecordResultPage
  ],
  providers: [
    Api,
    TournamentsProvider,
    MatchesProvider,
    PlayersProvider,
    ResultsProvider,
    MatchServiceProvider,
    Camera,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    NBATeamsService,
    StorageServiceProvider
  ]
})
export class AppModule { }
