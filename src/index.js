import React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './navigation.component';

// Setup Google Sign In
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  webClientId: "911996278294-6r8ti27v91q8qa15sivp0m3t48kvfavr"
})

// export default App;
export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);