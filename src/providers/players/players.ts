import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Player } from '../../models/player';
import { Api } from '../api/api';

@Injectable()
export class PlayersProvider {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('players', params)
      .map(resp => resp.json());
  }

  add(player: Player) {
  }

  delete(player: Player) {
  }
}
