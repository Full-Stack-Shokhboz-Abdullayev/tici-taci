import { Nullish } from '../../../shared/types/nullish.type';
import { Player } from '../../types/player.type';
import { PlayerType } from '../types/player.type';
import { Line } from './calculate-winner.interfaces';

export interface PlaygroundProps {
  className?: string;
}

export type PlayersState = Record<PlayerType, Player>;
export interface PlaygroundState {
  cells: Array<Nullish<string>>;
  xIsNext: boolean;
  winner: Nullish<string>;
  line: Partial<Line['line']>;
  scores: {
    [key: string]: number;
  };
  canMove: boolean;
}
