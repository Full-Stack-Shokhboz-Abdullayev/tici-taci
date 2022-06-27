import {
  CreateGame,
  JoinGame,
  Nullish,
  PlayerDto,
  PlayersState,
  PlayerType
} from '@tici-taci/typings';
import create from 'zustand';

interface State {
  title: Nullish<string>;
  code: Nullish<string>;
  players: Partial<PlayersState>;
}

type Scores = { [key: string]: number };

interface Actions {
  create: (payload: CreateGame) => void;
  join: (player: PlayerDto) => void;
  check: (game: Partial<JoinGame>) => void;
  opponentLeft: (game: Partial<JoinGame>) => void;
  updateScores(scores: Scores): void;
  empty: () => void;
}

const useGameStore = create<State & Actions>((set) => ({
  title: '',
  code: '',
  players: {},

  async create({ title, maker: { sign, name, score }, code }) {
    set((state) => {
      return {
        ...state,
        title,
        code,
        players: {
          ...state.players,
          local: {
            name,
            sign,
            score
          }
        }
      };
    });
  },

  async check({ code, joiner, maker, title }) {
    set((state) => {
      return {
        ...state,
        title,
        code,
        players: {
          ...state.players,
          local: joiner,
          remote: maker
        }
      };
    });
  },

  empty() {
    set((state) => ({
      ...state,
      title: '',
      code: '',
      players: {}
    }));
  },

  opponentLeft({ code, joiner, maker, title }) {
    set((state) => {
      return {
        ...state,
        title,
        code,
        players: {
          local: maker,
          remote: joiner
        }
      };
    });
  },

  join(player) {
    set((state) => ({
      ...state,
      players: {
        ...state.players,
        remote: {
          ...player
        }
      }
    }));
  },

  updateScores(scores) {
    set((state) => {
      if (state.players.local?.name && state.players.remote?.name) {
        const players = {} as PlayersState;

        Object.keys(state.players).forEach((key) => {
          players[key as PlayerType] = {
            ...(state.players[key as PlayerType] as PlayerDto),
            score: scores[(state.players[key as PlayerType] as PlayerDto).name]
          } as PlayerDto;
        });

        return { ...state, players };
      }
      return state;
    });
  }
}));

export default useGameStore;
