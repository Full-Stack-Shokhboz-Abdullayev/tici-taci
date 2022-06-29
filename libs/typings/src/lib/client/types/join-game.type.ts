import { CreateGame } from './create-game.type';
import { Player } from './player.type';

export interface JoinGame extends CreateGame {
  joiner: Player;
}
