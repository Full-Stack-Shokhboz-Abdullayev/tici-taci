import { FC, useMemo } from 'react';
import { TextInputProps, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { tw } from '../../../plugins/tailwind';

const Input: FC<
  TextInputProps & {
    styleType: 'black' | 'yellow';
    innerRef?: any;
    className?: string;
    disabled?: boolean;
  }
> = ({ className, styleType, innerRef, disabled, ...props }) => {
  const inputType = useMemo(
    () => (styleType === 'yellow' ? 'border-light-yellow' : 'border-black'),
    [styleType]
  );
  return (
    <View pointerEvents={disabled ? 'none' : 'auto'}>
      <TextInput
        autoComplete={'off'}
        style={tw`${
          className || ''
        } p-2 rounded bg-white border-2 ${inputType}`}
        {...props}
        ref={innerRef}
      ></TextInput>
    </View>
  );
};

export default Input;
