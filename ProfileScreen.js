import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView,SafeAreaView} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import {getUser} from "./firebase.js";
import firebase from './firebase';
import { DataTable,  DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const theme = {
  colors: {
    primary: '#8fe5c0',
  }
}


class ProfileScreen extends React.Component {
      state = {
      index: 0,
      dataPresent: false,
      isVisible: false,
      userList: [],
      orders: [],
      requests: [],
      user:""
      }

      orderRows = () => {
        return this.state.orders.map((order,index) => {
          return(
            <DataTable.Row>
              <DataTable.Cell >{order.Restaurant}</DataTable.Cell>
              <DataTable.Cell >{order.Location}</DataTable.Cell>
              <DataTable.Cell >{order.Time}</DataTable.Cell>
            </DataTable.Row>
          )
        })
      }

      requestRows = () => {
        return this.state.requests.map((order,index) => {
          return(
            <DataTable.Row>
              <DataTable.Cell >{order.Restaurant}</DataTable.Cell>
              <DataTable.Cell >{order.Location}</DataTable.Cell>
              <DataTable.Cell >{order.Time}</DataTable.Cell>
              <DataTable.Cell >{order.Deliverer}</DataTable.Cell>
            </DataTable.Row>
          )
        })
      }


      componentDidMount() {
        console.log(firebase.auth().currentUser.email)
        var r1;
        firebase.database().ref("users/").orderByChild("email").equalTo(firebase.auth().currentUser.email).once("value").then((snapshot) => {
           this.setState({user:Object.values(snapshot.val())})
           r1 = Object.values(snapshot.val())[0].username;
           return r1;
        }).then((result1) => {
          firebase.database().ref('users/'+  r1  + '/orders/').once('value').then((snapshot => {
              this.setState({orders: Object.values(snapshot.val()), dataPresent: true})
          }))
        }).then((result1) => {
          firebase.database().ref('users/'+  r1  + '/requests/').once('value').then((snapshot => {
              console.log(snapshot.val());
              this.setState({requests: Object.values(snapshot.val()), dataPresent: true})
        }))
      })
      }

      render() {
        if(this.state.dataPresent){
        return (
          <ThemeProvider theme={theme} >
          <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={{fontSize: 25, paddingTop: 20, paddingBottom: 20}}>Welcome Back {this.state.user[0].name}!</Text>
            <Text style={{fontSize: 20, fontWeight:'bold', textAlign: 'left', width: '100%', paddingLeft: 15, paddingTop: 20, paddingBottom:10}}>Order Pickups</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Restaurant</DataTable.Title>
                <DataTable.Title>Location</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
              </DataTable.Header>
              {this.orderRows()}
              </DataTable>
              <Text style={{fontSize: 20, fontWeight:'bold', textAlign: 'left', width: '100%', paddingLeft: 15, paddingTop: 40, paddingBottom:10}}>Order Requests</Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Restaurant</DataTable.Title>
                  <DataTable.Title>Location</DataTable.Title>
                  <DataTable.Title>Time</DataTable.Title>
                  <DataTable.Title>Deliverer</DataTable.Title>
                </DataTable.Header>
                {this.requestRows()}
                </DataTable>
                <Text style={{fontSize: 20, fontWeight:'bold', textAlign: 'center', width: '100%', paddingLeft: 15, paddingTop: 40, paddingBottom:10}}>Your Credit</Text>
                <Button
                  buttonStyle={{borderRadius: 0, marginLeft: 75, marginRight: 75, marginTop: 5, marginBottom: 20, width: 200}}
                  title={this.state.user[0].credits}
                  onPress={() =>
                    this.props.navigation.navigate('AddPickUp')
                  }
                />
          </View>
            </ScrollView>
            </ThemeProvider>
        );
      }
      else{
        return(
          <View>
          <Text> Data Loading </Text>
          </View>
        );
      }
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      scrollView: {
        marginHorizontal: 10,
      },
    });

export default ProfileScreen;
