import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavBar from './components/core/layout/NavBar';
import { SocketProvider } from './contexts/SocketProvider';
import { tw } from './plugins/tailwind';
import RouterContext from './router';
import { MyStatusBar } from './registries/status-bar.registry';
const App = () => {
  return (
    <SocketProvider>
      <>
        {/* <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="#5E8D48"
        /> */}
        <MyStatusBar
          barStyle={'light-content'}
          backgroundColor={'#151718'}
        ></MyStatusBar>
        <SafeAreaView style={tw`flex-1`}>
          {/* <ScrollView contentContainerStyle={tw`flex-1`}> */}
          <RouterContext navbar={<NavBar />}></RouterContext>
          {/* </ScrollView> */}
        </SafeAreaView>
      </>
    </SocketProvider>
  );
};

export default App;
