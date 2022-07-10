import { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { tw } from '../../../plugins/tailwind';

import Logo from '../../../assets/images/logo.svg';
import { useNavigate } from 'react-router-native';

const NavBar: FC = () => {
  const navigate = useNavigate();
  return (
    <View
      style={tw`h-10 py-2 px-8 w-full bg-light-yellow flex justify-center items-center`}
    >
      <TouchableOpacity
        style={tw`h-10 p-1`}
        activeOpacity={0.4}
        onPress={() => navigate('/')}
      >
        <Logo height={30} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
