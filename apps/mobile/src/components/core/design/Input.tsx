import { FC, useMemo } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { tw } from '../../../plugins/tailwind';

const Input: FC<
  TextInputProps & {
    styleType: 'black' | 'yellow';
    innerRef?: any;
    className?: string;
  }
> = ({ className, styleType, innerRef, ...props }) => {
  const inputType = useMemo(
    () => (styleType === 'yellow' ? 'border-light-yellow' : 'border-black'),
    [styleType]
  );
  return (
    <TextInput
      autoComplete={'off'}
      style={tw`${className || ''} p-2 rounded bg-white border-2 ${inputType}`}
      {...props}
      ref={innerRef}
    ></TextInput>
  );
};

export default Input;
