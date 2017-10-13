export class Match {
  "tournamentId": string;
  "gameRule": string;
  "playersId": string[];
  "date": string;
  "results": [{
    "player1": {
      "matchId": string,
      "playerId": string,
      "teamId":number,
      "matchIndex": number,
      "score": number,
      "gotShots": number,
      "shots": number,
      "gotThreePointsShots": number,
      "threePointsShots": number,
      "gotPenaltyShots": number,
      "penaltyShots": number,
      "fastBreakScore": number,
      "freeThrowLaneScore": number,
      "secondAttackScore": number,
      "substituteScore": number,
      "assists": number,
      "offensiveRebounds": number,
      "defensiveRebounds": number,
      "steals": number,
      "blockShots": number,
      "turnovers": number,
      "turnoverScores": number,
      "teamFouls": number,
      "maxLeadScore": number,
      "possessionTime": string,
      "remainingPauses": number,
      "win": Boolean
    }, "player2": {
      "matchId": string,
      "playerId": string,
      "teamId":number,
      "matchIndex": number,
      "score": number,
      "gotShots": number,
      "shots": number,
      "gotThreePointsShots": number,
      "threePointsShots": number,
      "gotPenaltyShots": number,
      "penaltyShots": number,
      "fastBreakScore": number,
      "freeThrowLaneScore": number,
      "secondAttackScore": number,
      "substituteScore": number,
      "assists": number,
      "offensiveRebounds": number,
      "defensiveRebounds": number,
      "steals": number,
      "blockShots": number,
      "turnovers": number,
      "turnoverScores": number,
      "teamFouls": number,
      "maxLeadScore": number,
      "possessionTime": string,
      "remainingPauses": number,
      "win": Boolean
    }
  }];
}
