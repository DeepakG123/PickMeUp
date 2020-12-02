import React, { Component, Fragment } from 'react';
import { View, Text, Image, Modal, TouchableHighlight, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon, Overlay, ThemeProvider } from 'react-native-elements'
import {addRequest} from "./firebase.js";
import firebase from './firebase';

const theme = {
  colors: {
    primary: '#8fe5c0',
  }
}

class Form extends Component {
      state = {
      orderList: [],
      index: 0,
      dataPresent: false,
      visible: false,
      }
      toggleModal(visible) {
        this.setState({ visible: visible });
      }

      cards = () => {
      return this.state.orderList.map((order,index) => {
          return (
            <ThemeProvider theme={theme} >
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
                color="#8fe5c0"
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={() => { this.setState(prevState => ({ index: index, visible:true})) }}
                title='More Details'
                 />
            </Card>
            </ThemeProvider>
          );
        });
      };

      componentDidMount() {
        var ordersRef = firebase.database().ref('/orders');
        ordersRef.on('value', (snapshot) => {
          // snapshot.val() is the dictionary with all your keys/values from the '/store' path
          this.setState({ orderList: Object.values(snapshot.val()), dataPresent: true})
        })
      }

      render() {
        if(this.state.dataPresent && this.state.orderList.length){
        return (
          <View>
          {this.cards()}
          <Modal visible={this.state.visible}  transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={{fontSize:25, marginBottom: 10}}>  {this.state.orderList[this.state.index].Restaurant}</Text>
                <Text style={{fontSize:15, marginBottom: 5}}>  {this.state.orderList[this.state.index].Number} Orders Left </Text>
                <Text style={{fontSize:15, marginBottom: 5}}>  {this.state.orderList[this.state.index].Location} </Text>
                <Text style={{fontSize:15, marginBottom: 5}}>  {this.state.orderList[this.state.index].Description} </Text>
                <Button
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  onPress={() =>{
                    addRequest(this.state.orderList[this.state.index].Restaurant, this.state.orderList[this.state.index].Location,this.state.orderList[this.state.index].Number, this.state.orderList[this.state.index].Time,this.state.orderList[this.state.index].Description, firebase.auth().currentUser.email,this.state.orderList[this.state.index].Username),
                    this.setState({visible:false})
                  }
                  }
                  title='Request Pickup'
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
    fontSize: 10,
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
