export class Match {
  tournamentId: string;
  gameRule: string;
  matches: [{
    player1Id: string;
    player2Id: string;
    player1TeamIndex: number;
    player2TeamIndex: number;
  }];
}
