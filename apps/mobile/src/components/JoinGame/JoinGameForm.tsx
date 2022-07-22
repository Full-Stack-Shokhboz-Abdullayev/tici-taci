import { FC } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { useJoinGame } from '../../hooks';
import { tw } from '../../plugins/tailwind';
import Button from '../core/design/Button';
import Input from '../core/design/Input';

const JoinGameForm: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    title
  } = useJoinGame(navigate);
  return (
    <View>
      <Text style={tw`text-xl text-center`}>Join The Game - {title}!</Text>
      <View style={tw`my-3`}>
        <Text style={tw`my-2 font-bold text-base`}>Your name please:</Text>
        <View style={tw`mx-2`}>
          <Input
            onBlur={handleBlur('joiner.name')}
            onChangeText={handleChange('joiner.name')}
            value={values.name}
            testID="joiner.name"
            styleType="black"
            className="w-full"
            placeholder="John Doe"
          />

          {errors.name && touched.name && (
            <Text style={tw`text-red-600 mt-2`}>{errors.name}</Text>
          )}
        </View>
      </View>
      <View style={tw`flex justify-center mx-2`}>
        <Button
          disabled={!values.name || isSubmitting}
          styleType="yellow"
          onPress={() => handleSubmit()}
          className="w-full border-black border-2"
        >
          Enjoin (enjoy by joining) 🚀
        </Button>
      </View>
    </View>
  );
};

export default JoinGameForm;
