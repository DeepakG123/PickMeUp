import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './login';
import Signup from './signup';
import HomeScreen from './HomeScreen';
import AddPickUp from './AddPickUp'
import ProfileScreen from './ProfileScreen'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator
          initialRouteName="Signup"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#8fe5c0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
              marginTop: 10
            },
          }}>
          <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
            />
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
    backgroundColor: '#8fe5c0',
    alignItems: 'center',
  },
});

export default App;
