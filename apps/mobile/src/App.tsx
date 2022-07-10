import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavBar from './components/core/layout/NavBar';
import { SocketProvider } from './contexts/SocketProvider';
import { tw } from './plugins/tailwind';
import RouterContext from './router';
const App = () => {
  return (
    <SocketProvider>
      <>
        <StatusBar barStyle="light-content" />
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
