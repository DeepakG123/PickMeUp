import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {ThemeProvider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useForm } from "react-hook-form"
import PickUpForm from './AddPickUpForm';

const theme = {
  colors: {
    primary: '#8fe5c0',
  }
}

export default class HomeScreen extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme} >
      <View style={styles.container}>
        <Button
          buttonStyle={{borderRadius: 0, marginLeft: 75, marginRight: 75, marginBottom: 20, marginTop: 20}}
          title="View Orders"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
        <PickUpForm/>
      </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
