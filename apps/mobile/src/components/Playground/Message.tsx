import { Nullish, PlayersState, PlayerType } from '@tici-taci/typings';
import { FC, memo, useMemo } from 'react';
import { Text, View } from 'react-native';
import { tw } from '../../plugins/tailwind';

import Button from '../core/design/Button';

interface MessageProps {
  winner: Nullish<string>;
  restart: () => void;
  players: Partial<PlayersState>;
  xIsNext: boolean;
}

const findKeyBySign = (players: PlayersState, value: string) => {
  return Object.keys(players).find((key) => {
    return players[key as PlayerType].sign === value;
  });
};

const Message: FC<MessageProps> = ({ winner, restart, players, xIsNext }) => {
  if (!players.remote) {
    return (
      <Text style={tw`text-center mt-2`}>
        {!players.remote && 'Waiting for the opponent to join'}
      </Text>
    );
  } else if (!winner && players.local) {
    const whoseTurn = useMemo(() => {
      const playerType = findKeyBySign(
        players as PlayersState,
        xIsNext ? 'X' : 'O'
      ) as PlayerType;
      if (playerType) {
        return players[playerType]?.name;
      }
      return '';
    }, [players, xIsNext]);

    return <Text style={tw`text-center mt-2`}>Now turn to {whoseTurn}</Text>;
  } else if (winner) {
    const winnerPlayer = useMemo(() => {
      const winnerType = findKeyBySign(
        players as PlayersState,
        winner
      ) as PlayerType;
      if (winnerType) {
        return players[winnerType]?.name;
      }
      return '';
    }, [players, winner]);

    return (
      <View style={tw`flex justify-center mt-2 flex-col w-full`}>
        <Text style={tw`text-lg text-center`}>
          {(winner as unknown) === 'tie' ? (
            <Text style={tw`font-bold`}>Tie!</Text>
          ) : (
            <>
              <Text style={tw`font-bold mr-2`}>{winnerPlayer}</Text> won!
            </>
          )}
        </Text>
        <Button
          styleType="yellow"
          className="my-2 w-full"
          onPress={() => restart()}
        >
          Restart
        </Button>
      </View>
    );
  }
  return <></>;
};

export default memo(Message);
