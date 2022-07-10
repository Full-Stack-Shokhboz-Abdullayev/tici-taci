import { PlaygroundProps } from '@tici-taci/typings';
import { FC } from 'react';
import { View } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal, usePlayground } from '../hooks';
import { tw } from '../plugins/tailwind';

import JoinGameForm from './JoinGame/JoinGameForm';
import Fallback from './Playground/Fallback';
import Line from './Playground/Line';
import Message from './Playground/Message';
import SquaresGrid from './Playground/SquaresGrid';

const Playground: FC<PlaygroundProps> = ({ className }) => {
  const navigate = useNavigate();

  const { code } = useParams() as { code: string };

  const { open, close } = useModal(<JoinGameForm />, {
    onClose(): void {
      navigate(`/`);
    }
  });

  const { cells, line, winner, xIsNext, canMove, players, mark, restart } =
    usePlayground(navigate, open, close, code);

  return (
    <View style={tw`${className || ''} flex justify-center items-center w-4/5`}>
      <View pointerEvents={canMove ? 'auto' : 'none'}>
        <Line></Line>
        <Fallback
          canMove={canMove}
          players={players}
          xIsNext={xIsNext}
          winner={winner}
        />
        <SquaresGrid onClick={mark} squares={cells} />
      </View>

      <Message
        xIsNext={xIsNext}
        winner={winner}
        restart={restart}
        players={players}
      />
    </View>
  );
};

export default Playground;
