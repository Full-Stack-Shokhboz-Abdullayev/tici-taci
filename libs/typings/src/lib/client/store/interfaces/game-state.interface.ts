import { Nullish } from '../../../shared/types/nullish.type';
import { PlayersState } from '../../playground/interfaces/index.interfaces';

export interface GameState {
  title: Nullish<string>;
  code: Nullish<string>;
  players: Partial<PlayersState>;
}
