import { FC } from 'react';
import { View } from 'react-native';
import Divider from '../components/core/layout/Divider';
import CreateGame from '../components/CreateGame';
import JoinGame from '../components/JoinGame';
import { tw } from '../plugins/tailwind';

const HomePage: FC = () => {
  return (
    <View style={tw`flex flex-1 justify-center items-center`}>
      <JoinGame></JoinGame>
      <Divider></Divider>
      <CreateGame></CreateGame>
    </View>
  );
};

export default HomePage;
