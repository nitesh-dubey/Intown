import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react';
import Providers from './navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <Providers />
    </SafeAreaProvider>
  )
  // return <Providers />;
};

export default App;
