import React, { Component, Fragment } from 'react';
import { View, Text, Image, Modal, TouchableHighlight, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements'
import {getOrders} from "./firebase.js";
import firebase from './firebase';

class Form extends Component {
      state = {
      orderList: [],
      index: 0,
      dataPresent: false,
      visible: false,
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
                onPress={() => { this.setState(prevState => ({ index: index, visible:true})) }}
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
          <Modal visible={this.state.visible} >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text>{this.state.orderList[this.state.index].Restaurant}</Text>
                <Text> {this.state.orderList[this.state.index].Number} Orders Left </Text>
                <Text> {this.state.orderList[this.state.index].Location} </Text>
                <Text> {this.state.orderList[this.state.index].Description} </Text>
                <Button
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  onPress={() => this.setState({visible:false})}
                  title='Request Pickup'
                 />
                 <Button
                   buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                   onPress={() => this.setState({visible:false})}
                   title='Close Modal'
                  />
              </View>
            </View>
          </Modal>
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
  centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
  modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 20,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
});

export default Form;
