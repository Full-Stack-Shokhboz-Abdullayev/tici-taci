import { Nullish } from '@tici-taci/typings';
import { FC, memo } from 'react';
import { TouchableOpacity } from 'react-native';

import O from '../../assets/images/o.svg';
import X from '../../assets/images/x.svg';
import { tw } from '../../plugins/tailwind';

interface SquareProps {
  value: Nullish<string>;
  onClick: (i: number) => void;
  index: number;
}

const Square: FC<SquareProps> = ({ value, onClick, index }) => {
  return (
    <TouchableOpacity
      onPress={() => onClick(index)}
      style={tw`h-24 w-24 flex justify-center items-center border-2 text-xl`}
    >
      {value &&
        (value === 'X' ? (
          <X width={50} height={50} fill="#000" />
        ) : (
          <O width={60} height={60} fill="#000" />
        ))}
    </TouchableOpacity>
  );
};

export default memo(Square);
