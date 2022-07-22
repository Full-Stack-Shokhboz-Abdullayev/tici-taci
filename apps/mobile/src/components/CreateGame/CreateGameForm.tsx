import { FC } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import { useNavigate } from 'react-router-dom';

import { useCreateGame } from '../../hooks';
import { tw } from '../../plugins/tailwind';
import Button from '../core/design/Button';
import Input from '../core/design/Input';
import SelectSwitch from '../core/design/SelectSwitch';

const signs = [
  {
    label: 'X',
    value: 'X'
  },
  {
    label: 'O',
    value: 'O'
  }
];
const CreateGameForm: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue
  } = useCreateGame(navigate);
  return (
    <ScrollView style={tw`flex-grow-1`}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={Platform.select({
          ios: 'padding'
        })}
      >
        <Text style={tw`text-xl text-center my-2`}>Create The Game!</Text>
        <View style={tw`my-3`}>
          <Text style={tw`my-2 font-bold text-base`}>Your name please:</Text>
          <View style={tw`mx-2`}>
            <Input
              onBlur={handleBlur('maker.name')}
              onChangeText={handleChange('maker.name')}
              value={values.maker.name}
              testID="maker.name"
              styleType="black"
              className="w-full"
              placeholder="John Doe"
            />
            {errors.maker?.name && touched.maker?.name && (
              <Text style={tw`text-red-600 mt-2`}>{errors.maker?.name}</Text>
            )}
          </View>
        </View>
        <View style={tw`my-3`}>
          <Text style={tw`my-2 font-bold text-base`}>
            Game title that you want:
          </Text>
          <View style={tw`mx-2`}>
            <Input
              onBlur={handleBlur('title')}
              onChangeText={handleChange('title')}
              value={values.title}
              testID="title"
              styleType="black"
              className="w-full"
              placeholder="The joyyee"
            />
            {errors.title && touched.title && (
              <Text style={tw`text-red-600 mt-2`}>{errors.title}</Text>
            )}
          </View>
        </View>
        <View style={tw`my-3`}>
          <Text style={tw`my-2 font-bold text-lg`}>X or O?</Text>
          <SelectSwitch
            value={values.maker.sign}
            options={signs}
            onChange={(value) => setFieldValue('maker.sign', value)}
          ></SelectSwitch>
        </View>
        <View style={tw`flex justify-center mt-8 mx-2`}>
          <Button
            disabled={
              !values.maker.name ||
              !values.title ||
              !values.maker.sign ||
              isSubmitting
            }
            onPress={() => {
              handleSubmit();
            }}
            styleType="yellow"
            className="w-full border-black border-2"
          >
            Launch it 🚀
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default CreateGameForm;
