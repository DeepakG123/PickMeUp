import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {getUser} from "./firebase.js";
import firebase from './firebase';

class ProfileScreen extends React.Component {
      state = {
      index: 0,
      dataPresent: false,
      isVisible: false,
      userList: [],
      orders: []
      }

      componentDidMount() {
        var r1;
        firebase.database().ref("/users").orderByChild("email").equalTo(firebase.auth().currentUser.email).once("value").then((snapshot) => {
           this.setState({user:Object.values(snapshot.val())})
           r1 = Object.values(snapshot.val())[0].username;
           return r1;
        }).then((result1) => {
          firebase.database().ref('users/'+  r1  + '/orders/').once('value').then((snapshot => {
              this.setState({orders: Object.values(snapshot.val()), dataPresent: true})
          }))
        })
      }

      render() {
        if(this.state.dataPresent){
          console.log(this.state.orders);
        return (
          <View style={styles.container}>
            <Text>Welcome {this.state.user[0].name}</Text>
            <Text>Order Requests</Text>
            <Text>Order Pickups</Text>
          </View>
        );
      }
      else{
        return(
          <View>
          <Text> Data Loading </Text>
          </View>
        )
      }
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
    });

export default ProfileScreen;
