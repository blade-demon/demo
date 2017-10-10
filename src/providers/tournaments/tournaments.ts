import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Tournament } from "../../models/tournament";
import { Api } from '../api/api';
@Injectable()
export class TournamentsProvider {

  constructor(public http: Http, public api: Api) {
    // console.log('Hello TournamentsProvider Provider');
  }

  query(params?: any) {
    return this.api.get('/tournaments', params)
      .map(resp => resp.json());
  }
}
