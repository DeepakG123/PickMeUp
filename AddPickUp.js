import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {storeHighScore} from "./firebase.js";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useForm } from "react-hook-form"
import PickUpForm from './AddPickUpForm';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="View Orders"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
        <PickUpForm/>
      </View>
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
