import { FC, memo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { tw } from '../../plugins/tailwind';
import * as Clipboard from 'expo-clipboard';

import Button from '../core/design/Button';
import Input from '../core/design/Input';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';

export const ShareGameComponent: FC<{ gameLink: string }> = ({ gameLink }) => {
  const inp = useRef(null);
  const [copied, setCopied] = useState(false);

  const copy: () => void = async () => {
    await Clipboard.setStringAsync(gameLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  return (
    <View
      style={tw`flex justify-center items-center my-3 w-full z-50 elevation-1`}
    >
      <View style={tw`-z-50 w-full flex justify-center items-center top-full`}>
        {copied && (
          <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={{
              ...tw`text-center elevation-1 py-1 px-3 absolute top-full rounded bg-black z-20 mt-2`
            }}
          >
            <Text style={tw`text-white`}>Copied!</Text>
          </Animated.View>
        )}
      </View>
      <View
        style={tw`relative w-4/5 sm:w-[450px] flex items-center justify-center z-50 elevation-2`}
      >
        <Input
          disabled={true}
          innerRef={inp}
          value={gameLink}
          styleType="yellow"
          className="z-50"
          onPressIn={copy}
        />
        <View style={[tw`absolute z-50 right-3 pl-8`]}>
          <Shadow
            distance={10}
            startColor={'rgba(255,255,255, 0.8)'}
            finalColor={'rgba(255,255,255, 0.6)'}
            offset={[-20, 0]}
          >
            <Button onPress={copy} styleType="black" className="py-1 px-3 z-50">
              Share
            </Button>
          </Shadow>
        </View>
      </View>
    </View>
  );
};
export const ShareGame = memo(ShareGameComponent);
