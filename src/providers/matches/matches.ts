import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Match } from '../../models/match';
import { Api } from '../api/api';

@Injectable()
export class Matches {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/matches', params)
      .map(resp => resp.json());
  }

  add(match: Match) {

  }

  delete(match: Match) {
  }

}
