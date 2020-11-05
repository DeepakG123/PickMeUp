import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {getUser} from "./firebase.js";
import firebase from './firebase';
import { DataTable } from 'react-native-paper';


class ProfileScreen extends React.Component {
      state = {
      index: 0,
      dataPresent: false,
      isVisible: false,
      userList: [],
      orders: []
      }

      orderRows = () => {
        return this.state.orders.map((order,index) => {
          return(
            <DataTable.Row>
              <DataTable.Cell numeric>{order.Restaurant}</DataTable.Cell>
              <DataTable.Cell numeric>{order.Number}</DataTable.Cell>
              <DataTable.Cell numeric>{order.Location}</DataTable.Cell>
              <DataTable.Cell numeric>{order.Time}</DataTable.Cell>
            </DataTable.Row>
          )
        })
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
            <Text>Order Pickups</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Restaurant</DataTable.Title>
                <DataTable.Title numeric>Orders Left</DataTable.Title>
                <DataTable.Title>Location</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
              </DataTable.Header>
              {this.orderRows()}
              </DataTable>
              <Text>Order Requests</Text>
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
