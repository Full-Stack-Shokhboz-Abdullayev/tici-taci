import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

export const createSigns = (imgs: Record<string, FC<SvgProps>>) =>
  Object.keys(imgs).map((key) => ({
    label: key.toUpperCase(),
    get value() {
      return this.label;
    },
    sign: imgs[key]
  }));
