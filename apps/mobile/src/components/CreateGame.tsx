import { FC } from 'react';
import { View } from 'react-native';
import { useModal } from '../hooks';

import { tw } from '../plugins/tailwind';
import Button from './core/design/Button';
import CreateGameForm from './CreateGame/CreateGameForm';

const CreateGame: FC = () => {
  const { open } = useModal(<CreateGameForm />, {});
  return (
    <View style={tw`flex w-full justify-center items-center flex-grow-1 `}>
      <Button className="w-4/5" styleType="yellow" onPress={() => open()}>
        Create Game
      </Button>
    </View>
  );
};

export default CreateGame;
