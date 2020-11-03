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
        <Text>Add Pick Up</Text>
        <Button
          title="View Orders"
          onPress={() =>
            this.props.navigation.navigate('Home')
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
