import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Result } from '../../models/result';
import { Api } from '../api/api';

@Injectable()
export class ResultsProvider {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/results', params)
      .map(resp => resp.json());
  }

  add(result: Result) {
  }

  delete(result: Result) {
  }

}
