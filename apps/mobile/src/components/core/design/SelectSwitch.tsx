import { FC, memo, useCallback } from 'react';
import { View } from 'react-native';
import { tw } from '../../../plugins/tailwind';
import O from '../../../assets/images/o.svg';
import X from '../../../assets/images/x.svg';
import Button from './Button';

interface Option {
  value: string;
  label: string;
}

interface SelectSwitchProps {
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  value: string | number;
}

const SelectSwitch: FC<SelectSwitchProps> = ({
  options,
  onChange,
  className,
  value
}) => {
  const fill = useCallback(
    (label: string) => {
      return label === value ? '#000' : '#fff';
    },
    [value]
  );

  return (
    <View style={tw`${className || ''} flex flex-row justify-between`}>
      {options.map((option, index) => (
        <Button
          className={`w-[45%] font-bold mx-1 flex justify-center items-center ${
            option.value === value ? 'border-2 border-black bg-white' : ''
          }`}
          onPress={() => onChange(option.value)}
          styleType="black"
          key={'switch ' + index}
        >
          {option.label === 'X' ? (
            <X width={20} height={20} fill={fill(option.value)} />
          ) : (
            <O width={20} height={20} fill={fill(option.value)} />
          )}
        </Button>
      ))}
    </View>
  );
};
export default memo(SelectSwitch);
