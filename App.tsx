import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import {StatusBar} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import ResturantScreen from './screens/ResturantScreen';
import {Provider} from 'react-redux';
import {store} from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';

changeNavigationBarColor('white');

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Resturant" component={ResturantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{presentation: 'modal', headerShown: false}}
          />

          <Stack.Screen
            name="PreparingOrderScreen"
            component={PreparingOrderScreen}
            options={{presentation: 'fullScreenModal', headerShown: false}}
          />

          <Stack.Screen
            name="DeliveryScreen"
            component={DeliveryScreen}
            options={{presentation: 'fullScreenModal', headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
