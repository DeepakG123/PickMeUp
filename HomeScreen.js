import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {getUser} from "./firebase.js";
import OrderGrid from './OrderCards';
import firebase from './firebase';

class HomeScreen extends React.Component {
  render() {
    console.log(firebase.auth().currentUser.uid);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Button
            title="Add a Pick Up"
            onPress={() =>
              this.props.navigation.navigate('AddPickUp')
            }
          />
          <Button
            title="Profile Screen"
            onPress={() =>
              this.props.navigation.navigate('ProfileScreen')
            }
          />
            <OrderGrid/>
            </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default HomeScreen;
