import { FC } from 'react';
import { useModalStore } from '../store/modal.store';
import {
  Modal as NativeModal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { tw } from '../plugins/tailwind';

const Modal: FC = () => {
  const { component, isOpen, setIsOpen, onClose } = useModalStore();

  const close = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <NativeModal animationType="fade" transparent visible={isOpen}>
      <View
        style={tw`flex-1 bg-white bg-opacity-80 flex justify-center items-center h-full`}
      >
        <View
          style={tw`sm:w-3/5 md:w-2/3 lg:w-1/3 w-11/12 h-auto bg-light-yellow rounded-md sm:p-6 p-4`}
        >
          <View
            style={tw`-top-2 -right-2 absolute z-50 rounded-full bg-black w-7 h-7 border-2 border-white flex justify-center items-center`}
          >
            <TouchableOpacity
              style={tw`flex-1 w-full h-full justify-center items-center`}
              onPress={() => close()}
            >
              <Text style={tw`text-white`}>X</Text>
            </TouchableOpacity>
          </View>
          {component}
        </View>
      </View>
    </NativeModal>
  );
};

export default Modal;
