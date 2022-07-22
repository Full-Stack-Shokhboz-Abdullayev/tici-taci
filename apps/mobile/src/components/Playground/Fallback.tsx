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
        tw`flex justify-center items-center absolute w-full h-full z-50 left-0 bg-opacity-90 bg-white`,
        {
          elevation: 2
        }
      ]}
    >
      <Text>Loading...</Text>
      {/* <Loading show={true} /> */}
    </View>
  ) : (
    <></>
  );
};

export default Fallback;
