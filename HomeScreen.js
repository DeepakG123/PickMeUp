import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {getUser} from "./firebase.js";
import OrderGrid from './OrderCards';
import firebase from './firebase';

class HomeScreen extends React.Component {
  render() {
    console.log(firebase.auth().currentUser.uid);
    return (
      <View style={styles.container}>
        <Text>View Orders</Text>
        <Button
          title="Add a Pick Up"
          onPress={() =>
            this.props.navigation.navigate('AddPickUp')
          }
        />
        <OrderGrid/>
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

export default HomeScreen;
