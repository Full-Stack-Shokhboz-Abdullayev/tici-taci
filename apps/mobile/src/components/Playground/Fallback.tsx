import { Nullish, PlayersState } from '@tici-taci/typings';
import { FC } from 'react';
import { Text, View } from 'react-native';
import { tw } from '../../plugins/tailwind';

const Fallback: FC<{
  players: Partial<PlayersState>;
  xIsNext: boolean;
  canMove: boolean;
  winner: Nullish<string>;
}> = ({ players, xIsNext, winner, canMove }) => {
  return !players.remote ||
    ((players.local?.sign === 'O' ? xIsNext : !xIsNext) && !winner) ||
    !canMove ? (
    <View
      style={[
        tw`flex flex-row justify-center absolute w-full h-full z-50 bg-opacity-90 bg-white items-center`,
        {
          elevation: 2
        }
      ]}
    >
      <Text>Loading...</Text>
    </View>
  ) : (
    <></>
  );
};

export default Fallback;
