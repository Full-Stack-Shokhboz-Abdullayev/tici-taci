import { PlayerType } from '@tici-taci/typings';
import { memo } from 'react';
import { Text, View } from 'react-native';
import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import { tw } from '../../plugins/tailwind';
import useGameStore from '../../store/game.store';

const Scores = () => {
  const players = useGameStore((state) => state.players);
  return players.local && players.remote ? (
    <View style={tw`flex flex-row items-center justify-center`}>
      {Object.keys(players).map((playerType) => {
        const player = players[playerType as PlayerType];
        return (
          <View
            style={tw`mx-4 flex items-center justify-center`}
            key={player?.sign}
          >
            <Text style={tw`font-bold flex items-center justify-center`}>
              {player?.name}
              &nbsp;
              {player?.sign === 'X' ? (
                <X width={10} height={10} fill="#000" />
              ) : (
                <O width={10} height={10} fill="#000" />
              )}
              &nbsp;: {player?.score}
            </Text>
          </View>
        );
      })}
    </View>
  ) : (
    <></>
  );
};

export default memo(Scores);
