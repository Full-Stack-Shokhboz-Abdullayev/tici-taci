import { Line as LineType, Perspective } from '@tici-taci/typings';
import { FC, memo } from 'react';
import { View } from 'react-native';
import Svg, { Line as SvgLine } from 'react-native-svg';
import { tw } from '../../plugins/tailwind';

// const getAttrs = () => {};

const perscpectives = {
  [Perspective.DIOGANAL]() {
    return {
      x1: '0%'
    };
  },
  [Perspective.HORIZONTAL]: {},
  [Perspective.VERTICAL]: {}
};

const Line: FC<{ line: LineType['line'] }> = () => {
  return (
    <View style={tw`w-full absolute h-full left-0 top-0 z-50`}>
      <Svg style={tw`w-full h-full`}>
        <SvgLine
          x1="50%"
          y1="0"
          x2="50%"
          y2="400"
          stroke="red"
          strokeWidth="4"
        />
      </Svg>
    </View>
  );
};

export default memo(Line);
