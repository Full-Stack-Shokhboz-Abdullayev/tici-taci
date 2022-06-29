import {
  GameActions,
  GameState,
  Player,
  PlayersState,
  PlayerType
} from '@tici-taci/typings';
import create from 'zustand';

export const createGameStore = () =>
  create<GameState & GameActions>((set) => ({
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
              ...(state.players[key as PlayerType] as Player),
              score: scores[(state.players[key as PlayerType] as Player).name]
            } as Player;
          });

          return { ...state, players };
        }
        return state;
      });
    }
  }));
