import { Nullish } from '@tici-taci/typings';
import { FC } from 'react';
import { View } from 'react-native';
import { tw } from '../../plugins/tailwind';

import Square from './Square';

const SquaresGrid: FC<{
  squares: Nullish<string>[];
  onClick: (i: number) => void;
}> = ({ squares, onClick }) => {
  return (
    <View style={tw`flex-row justify-center items-center flex-wrap w-72 h-72`}>
      {squares.map((value, i) => (
        <Square value={value} onClick={onClick} index={i} key={'sqq' + i} />
      ))}
    </View>
  );
};

export default SquaresGrid;
