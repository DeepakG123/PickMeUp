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
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Dessert</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
                <DataTable.Cell numeric>6.0</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                  console.log(page);
                }}
                label="1-2 of 6"
              />
              </DataTable>
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
