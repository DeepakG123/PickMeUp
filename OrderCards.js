import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'
import {getOrders} from "./firebase.js";
import firebase from './firebase';


export default class Form extends Component {
      state = {orders:
        [
       {
          restaurant: 'Chipotle',
          location: 'Clemons Library',
          number: 4,
          time: '3:00pm',
          description: 'Meet at the first floor'
       },
       {
          restaurant: 'Roots',
          location: 'Clark Library',
          number: 2,
          time: '12:00pm',
          description: 'Meet in the classroom at 12:15pm'
       }
     ],
      orderList: [],
      visible: false,
      index: 0,
      dataPresent: false
      }


      cards = () => {
      return this.state.orderList.map((order,index) => {
          return (
            <Card>
              <Card.Title>{order.Restaurant}</Card.Title>
              <Card.Divider/>
              <Text style={{marginBottom: 10}}>
                  Pickup Time: {order.Time}
              </Text>
              <Text style={{marginBottom: 10}}>
                  Number of Orders Left: {order.Number}
              </Text>
              <Button
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={() => { this.setState(prevState => ({ index: index})) }}
                title='More Details'
                 />
            </Card>
          );
        });
      };

      componentDidMount() {
        var ordersRef = firebase.database().ref('/orders');
        ordersRef.once('value').then(snapshot => {
          // snapshot.val() is the dictionary with all your keys/values from the '/store' path
          this.setState({ orderList: Object.values(snapshot.val()), dataPresent: true})
        })
      }

      render() {
        var orderArray = Object.values(this.state.orderList);
        if(this.state.dataPresent){
        return (
          <View>
          {this.cards()}
          <Overlay isVisible={this.state.visible} onBackdropPress={() => { this.setState(prevState => ({ visible: false })) }}>
            <Text>{this.state.orders[this.state.index].restaurant}</Text>
            <Text> {this.state.orders[this.state.index].number} Orders Left </Text>
            <Text> {this.state.orders[this.state.index].location} </Text>
            <Text> {this.state.orders[this.state.index].description} </Text>
            <Button
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              onPress={() => { this.setState(prevState => ({ visible: true})) }}
              title='Request Pickup'
             />
          </Overlay>
          </View>
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
