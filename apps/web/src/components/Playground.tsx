import { PlaygroundProps } from '@tici-taci/typings';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useModal, usePlayground } from '../hooks';

import JoinGameForm from './JoinGame/JoinGameForm';
import Fallback from './Playground/Fallback';
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
    <div className={`${className} playground-container`}>
      <div className="relative">
        <Fallback
          canMove={canMove}
          players={players}
          xIsNext={xIsNext}
          winner={winner}
        />
        <SquaresGrid line={line} onClick={mark} squares={cells} />
      </div>

      <Message
        xIsNext={xIsNext}
        winner={winner}
        restart={restart}
        players={players}
      />
    </div>
  );
};

export default Playground;
