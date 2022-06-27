import { PlaygroundState } from '@tici-taci/typings';

export const defaultPlaygroundState: (xIsNext: boolean) => PlaygroundState = (
  xIsNext
) => ({
  cells: Array(9).fill(null),
  xIsNext,
  winner: null,
  line: {},
  scores: {},
  canMove: true
});
