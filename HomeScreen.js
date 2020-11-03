import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {storeHighScore} from "./firebase.js";


class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>View Orders</Text>
        <Button
          title="Add a Pick Up"
          onPress={() =>
            this.props.navigation.navigate('AddPickUp')
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
  },
});

export default HomeScreen;
