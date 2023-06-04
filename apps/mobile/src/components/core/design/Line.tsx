import React, { ReactElement, useRef, useEffect, useMemo } from 'react';
import {
  Animated,
  View,
  RotateZTransform,
  TranslateXTransform,
  TranslateYTransform
} from 'react-native';
import { tw } from '../../../plugins/tailwind';
import { Line, Perspective } from '@tici-taci/typings';

const size = 288;
const diagonalHeight = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));

const lineThickness = 8;

const mapper: Record<
  string,
  {
    parentFlexMode: 'flex-row' | 'flex-row-reverse';
    selectedWidth?: number;
    transform: (RotateZTransform | TranslateXTransform | TranslateYTransform)[];
  }
> = {
  [`${Perspective.DIAGONAL}_${'left'}`]: {
    parentFlexMode: 'flex-row',
    selectedWidth: diagonalHeight,
    transform: [
      {
        translateX: -diagonalHeight / 2 + lineThickness / 2
      },
      {
        rotateZ: '45deg'
      },
      {
        translateX: diagonalHeight / 2 - lineThickness / 2
      }
    ]
  },

  [`${Perspective.DIAGONAL}_${'right'}`]: {
    parentFlexMode: 'flex-row-reverse',
    selectedWidth: diagonalHeight,

    transform: [
      {
        translateX: diagonalHeight / 2 - lineThickness / 2
      },
      {
        rotateZ: '-45deg'
      },
      {
        translateX: -diagonalHeight / 2 + lineThickness / 2
      }
    ]
  },

  [`${Perspective.HORIZONTAL}_${'1'}`]: {
    parentFlexMode: 'flex-row',
    transform: [
      {
        translateY: size / (6 / 1) - lineThickness / 2
      }
    ]
  },

  [`${Perspective.HORIZONTAL}_${'2'}`]: {
    parentFlexMode: 'flex-row',
    transform: [
      {
        translateY: size / (6 / 3) - lineThickness / 2
      }
    ]
  },

  [`${Perspective.HORIZONTAL}_${'3'}`]: {
    parentFlexMode: 'flex-row',
    transform: [
      {
        translateY: size / (6 / 5) - lineThickness / 2
      }
    ]
  },

  [`${Perspective.VERTICAL}_${'1'}`]: {
    parentFlexMode: 'flex-row',
    transform: [
      {
        rotateZ: '90deg'
      },
      {
        translateX: size / 2 - lineThickness / 2
      },

      {
        translateY: size / (6 / 2) - (lineThickness / 2 - 4)
      }
    ]
  },

  [`${Perspective.VERTICAL}_${'2'}`]: {
    parentFlexMode: 'flex-row',
    transform: [
      {
        rotateZ: '90deg'
      },
      {
        translateX: size / 2 - lineThickness / 2
      },

      {
        translateY: size / (6 / 0) - (lineThickness / 2 - 4)
      }
    ]
  },

  [`${Perspective.VERTICAL}_${'3'}`]: {
    parentFlexMode: 'flex-row',
    transform: [
      {
        rotateZ: '90deg'
      },
      {
        translateX: size / 2 - lineThickness / 2
      },

      {
        translateY: size / (6 / -2) - (lineThickness / 2 - 4)
      }
    ]
  }
};

export function Lines({ line }: { line: Partial<Line['line']> }): ReactElement {
  const animationRef = useRef<Animated.Value>(new Animated.Value(0));

  const lineData = useMemo(() => {
    return mapper[`${line?.perspective}_${line?.position}`];
  }, [line]);

  useEffect(() => {
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <View style={tw`absolute h-72 w-72 ${lineData?.parentFlexMode} z-50`}>
      <View
        style={[
          tw`flex flex-row justify-start`,
          {
            width: lineData?.selectedWidth ?? size,

            transform: [...(lineData?.transform ?? [])],

            height: lineThickness
          }
        ]}
      >
        <Animated.View
          style={{
            ...tw`bg-black h-full`,
            width: animationRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, lineData?.selectedWidth ?? size]
            })
          }}
        ></Animated.View>
      </View>
    </View>
  );
}
