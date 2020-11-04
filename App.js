import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './login';
import Signup from './signup';
import HomeScreen from './HomeScreen';
import AddPickUp from './AddPickUp'
import {storeHighScore} from "./firebase.js";

const Stack = createStackNavigator();



class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#3740FE',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
          />
          <Stack.Screen
              name="AddPickUp"
              component={AddPickUp}
            />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'Signup' }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={
              {title: 'Login'},
              {headerLeft: null}
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default App;
