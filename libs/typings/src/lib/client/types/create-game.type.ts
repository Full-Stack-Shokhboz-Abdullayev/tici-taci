import { Player } from './player.type';

export type CreateGame = {
  title: string;
  code: string;
  flip: boolean;
  maker: Player;
};
