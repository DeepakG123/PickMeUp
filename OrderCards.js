import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'
import {getOrders} from "./firebase.js";
import firebase from './firebase';


export default class Form extends Component {
      state = {
      orderList: [],
      index: 0,
      dataPresent: false,
      isVisible: false,
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
        if(this.state.dataPresent){
        return (
          <View>
          {this.cards()}
          <Overlay isVisible={this.state.isVisible} onBackdropPress={() => this.setState({isVisible:false})}>
            <Text>{this.state.orderList[this.state.index].Restaurant}</Text>
            <Text> {this.state.orderList[this.state.index].Number} Orders Left </Text>
            <Text> {this.state.orderList[this.state.index].Location} </Text>
            <Text> {this.state.orderList[this.state.index].Description} </Text>
            <Button
              buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
              onPress={() => this.setState({isVisible:true})}
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
