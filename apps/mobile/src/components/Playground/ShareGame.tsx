import { FC, memo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { tw } from '../../plugins/tailwind';

import Button from '../core/design/Button';
import Input from '../core/design/Input';

function fallbackCopyTextToClipboard(text: string, el: any) {
  el.focus();
  el.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
}
function copyTextToClipboard(text: string, el: any) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, el);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Async: Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}

export const ShareGameComponent: FC<{ gameLink: string }> = ({ gameLink }) => {
  const inp = useRef(null);
  const [copied, setCopied] = useState(false);

  const copy: () => void = async () => {
    copyTextToClipboard(gameLink, inp);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  return (
    <View style={tw`flex justify-center items-center my-3 w-full`}>
      <View
        style={tw`relative w-4/5 sm:w-[450px] flex items-center justify-center`}
      >
        <Input
          // editable={false}
          innerRef={inp}
          value={gameLink}
          styleType="yellow"
          className="w-full z-50"
          onPressIn={copy}
        />
        <View
          style={tw`absolute z-[60] right-2 pl-14 pointer-events-none bg-gradient-to-l from-white to-[rgba(255,255,255,0)]`}
        >
          <Button
            onPress={copy}
            styleType="black"
            className="py-1 px-3 pointer-events-auto"
          >
            Share
          </Button>
        </View>
        <View
          style={tw`text-center py-1 px-3 absolute top-full rounded bg-black text-white z-40 mt-2  -translate-y-10 pointer-events-none opacity-0 ${
            copied ? 'copied' : ''
          }`}
        >
          <Text>Copied!</Text>
        </View>
      </View>
    </View>
  );
};
export const ShareGame = memo(ShareGameComponent);
