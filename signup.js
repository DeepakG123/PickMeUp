import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from './firebase'
import {addUser, addPickUp} from "./firebase.js";
import { Text } from 'react-native-elements';

export default class Signup extends Component {

  constructor() {
    super();
    this.state = {
      displayName: '',
      username: '',
      email: '',
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      addUser(this.state.username, this.state.email, this.state.displayName)
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName,
          username: this.state.username
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          username: '',
          email: '',
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <Text style={{color:'white', marginBottom:30}} h1>PickMeUp</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="username"
          value={this.state.username}
          onChangeText={(val) => this.updateInputVal(val, 'username')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="white"
          title="Sign Up"
          onPress={() => this.registerUser()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   padding: 35,
   borderColor: '#8fe5c0',
   backgroundColor: '#8fe5c0'
 },
 inputStyle: {
   width: '100%',
   marginBottom: 15,
   paddingBottom: 15,
   alignSelf: "center",
   borderColor: "white",
   borderBottomWidth: 1
 },
 loginText: {
   color: 'white',
   marginTop: 10,
   textAlign: 'center',
   fontSize: 20
 },
 preloader: {
   left: 0,
   right: 0,
   top: 0,
   bottom: 0,
   position: 'absolute',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: '#fff'
 }
});
