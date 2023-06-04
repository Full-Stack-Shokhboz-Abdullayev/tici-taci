import { FC } from 'react';
import { KeyboardAvoidingView, Platform, Text } from 'react-native';
import { useCheckGame, useModal } from '../hooks';
import { tw } from '../plugins/tailwind';
import Button from './core/design/Button';
import Input from './core/design/Input';
import JoinGameForm from './JoinGame/JoinGameForm';

const JoinGame: FC = () => {
  const { open } = useModal(<JoinGameForm />);

  const {
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
    handleSubmit
  } = useCheckGame(open);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex flex-1 flex-col w-4/5 justify-center m-6 h-full`}
      contentContainerStyle={tw`flex-1`}
    >
      <Text style={tw`text-xl text-center my-2`}>Join The Game!</Text>
      <Input
        styleType="yellow"
        className="my-2 text-center"
        placeholder="Enter the game code!"
        onBlur={handleBlur('code')}
        onChangeText={handleChange('code')}
        value={values.code}
        testID="code"
      ></Input>

      {errors.code && touched.code && (
        <Text style={tw`text-red-600 text-center`}>{errors.code}</Text>
      )}
      <Button
        disabled={(!!errors.code && !!touched.code) || isSubmitting}
        onPress={() => handleSubmit()}
        styleType="yellow"
        className="my-2"
      >
        Enter
      </Button>
    </KeyboardAvoidingView>
  );
};

export default JoinGame;
