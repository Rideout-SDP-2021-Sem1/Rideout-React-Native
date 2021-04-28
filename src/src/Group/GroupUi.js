import React, {useState} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Header} from './Header';
import {Footer} from './src/components/Footer';
import {GroupPost} from './src/components/GroupPost';
import {CreateGroup} from './src/components/CreateGroup';

const DrawerNavigation = createDrawerNavigator({
  Header: Header,
  Footer: Footer,
  GroupPost: GroupPost,
  CreateGroup: CreateGroup,
});

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Header: Header,
    Footer: Footer,
    GroupPost: GroupPost,
    CreateGroup: CreateGroup,
  },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(StackNavigation);

function Group(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return isLoadingComplete ? <AppContainer /> : <AppLoading />;
  }
}
async function loadResourcesAsync() {
  await Promise.all([
    Font.loadAsync({
      'roboto-regular': require('./src/assets/fonts/roboto-regular.ttf'),
      'roboto-700': require('./src/assets/fonts/roboto-700.ttf'),
      'arial-regular': require('./src/assets/fonts/arial-regular.ttf'),
    }),
  ]);
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

export default Group;
