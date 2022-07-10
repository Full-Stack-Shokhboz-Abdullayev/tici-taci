import { FC } from 'react';
import { Text, View } from 'react-native';
import { tw } from '../../../plugins/tailwind';

const lineStyle = tw`bg-light-yellow h-[2px] flex-1 self-center`;

const Divider: FC = () => {
  return (
    <View style={tw`w-4/5 flex-row`}>
      <View style={lineStyle} />
      <Text style={tw`self-center px-4 text-base`}>OR</Text>
      <View style={lineStyle} />
    </View>
  );
};

export default Divider;
