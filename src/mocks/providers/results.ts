import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Result } from '../../models/result';

@Injectable()
export class Results {
  results: Result[] = [];

  defaultResult: any = {
    "matchId": "657100911879",
    "playerId":"1062619387",
    "score": 86,
    "gotShots": 13,
    "shotTimes": 23,
    "gotThreePointsShots": 2,
    "threePointsShots": 2,
    "gotPenaltyShots": 8,
    "penaltyShots": 12,
    "fastBreakScore": 10,
    "freeThrowLaneScore": 16,
    "secondAttackScore": 4,
    "substituteScore": 0,
    "assists": 5,
    "offensiveRebounds": 5,
    "defensiveRebounds": 12,
    "steals": 3,
    "blockShots": 2,
    "turnovers": 0,
    "turnoverScores": 11,
    "teamFouls": 5,
    "maxLeadScore": 27,
    "possessionTime": "4:54",
    "remainingPauses": 2
  };

  constructor(public http: Http) {
    let results = [{
      "matchId": "657100911879",
      "playerId":"1062619387",
      "score": 86,
      "gotShots": 13,
      "shotTimes": 23,
      "gotThreePointsShots": 2,
      "threePointsShots": 2,
      "gotPenaltyShots": 8,
      "penaltyShots": 12,
      "fastBreakScore": 10,
      "freeThrowLaneScore": 16,
      "secondAttackScore": 4,
      "substituteScore": 0,
      "assists": 5,
      "offensiveRebounds": 5,
      "defensiveRebounds": 12,
      "steals": 3,
      "blockShots": 2,
      "turnovers": 0,
      "turnoverScores": 11,
      "teamFouls": 5,
      "maxLeadScore": 27,
      "possessionTime": "4:54",
      "remainingPauses": 2
    }, {
      "matchId": "657100911879",
      "playerId":"1062619387",
      "score": 86,
      "gotShots": 13,
      "shotTimes": 23,
      "gotThreePointsShots": 2,
      "threePointsShots": 2,
      "gotPenaltyShots": 8,
      "penaltyShots": 12,
      "fastBreakScore": 10,
      "freeThrowLaneScore": 16,
      "secondAttackScore": 4,
      "substituteScore": 0,
      "assists": 5,
      "offensiveRebounds": 5,
      "defensiveRebounds": 12,
      "steals": 3,
      "blockShots": 2,
      "turnovers": 0,
      "turnoverScores": 11,
      "teamFouls": 5,
      "maxLeadScore": 27,
      "possessionTime": "4:54",
      "remainingPauses": 2
    }];
    // mock match result data
    for(let i = 0; i < 10; i++) {
      results.push(this.defaultResult);
    }
    // push to this.results
    for (let result of results) {
      this.results.push(new Result(result));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.results;
    }

    return this.results.filter((player) => {
      for (let key in params) {
        let field = player[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return player;
        } else if (field == params[key]) {
          return player;
        }
      }
      return null;
    });
  }

  add(result: Result) {
    this.results.push(result);
  }

  delete(result: Result) {
    this.results.splice(this.results.indexOf(result), 1);
  }
}
