import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {getUser} from "./firebase.js";
import OrderGrid from './OrderCards';
import firebase from './firebase';
import AddPickUp from './AddPickUp'
import ProfileScreen from './ProfileScreen'

const theme = {
  colors: {
    primary: '#8fe5c0',
  }
}

class HomeScreen extends React.Component {
  state = {
    visible: false
  }

  render() {
    return (
      <ThemeProvider theme={theme} >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 75, marginRight: 75, marginTop: 10}}
            title="Add a Pick Up"
            onPress={() =>
              this.props.navigation.navigate('AddPickUp')
            }
          />
          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 75, marginRight: 75, marginTop: 10}}
            title="Profile Screen"
            onPress={() =>
              this.props.navigation.navigate('ProfileScreen')
            }
          />
            <OrderGrid/>
            </ScrollView>
        </SafeAreaView>
        </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default HomeScreen;
