import { FC, memo, useMemo } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { tw } from '../../../plugins/tailwind';

const Button: FC<
  TouchableOpacityProps & {
    styleType: 'black' | 'yellow';
    className?: string;
  }
> = memo(({ children, className, styleType, ...props }) => {
  const buttonType = useMemo(
    () =>
      styleType === 'yellow'
        ? { button: 'bg-light-yellow', text: 'text-black' }
        : {
            button: 'bg-black',
            text: 'text-white'
          },
    [styleType]
  );
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={tw`p-3 rounded text-center disabled:cursor-not-allowed ${
        buttonType.button
      } ${props.disabled ? 'opacity-50' : ''} ${className || ''} `}
      {...props}
    >
      <Text style={tw`${buttonType.text} text-center`}>{children}</Text>
    </TouchableOpacity>
  );
});

export default Button;
