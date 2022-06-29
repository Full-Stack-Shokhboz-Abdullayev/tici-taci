import { CreateGame } from '../../types/create-game.type';
import { JoinGame } from '../../types/join-game.type';
import { Player } from '../../types/player.type';

export interface GameActions {
  create: (payload: CreateGame) => void;
  join: (player: Player) => void;
  check: (game: Partial<JoinGame>) => void;
  opponentLeft: (game: Partial<JoinGame>) => void;
  updateScores(scores: Record<string, number>): void;
  empty: () => void;
}
