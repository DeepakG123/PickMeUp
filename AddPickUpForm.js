import * as yup from 'yup'
import { Formik } from 'formik'
import React, { Component, Fragment } from 'react';
import { TextInput, Text, Button, Alert, View } from 'react-native';
import { Input } from 'react-native-elements';
import {addPickUp} from "./firebase.js";
import firebase from './firebase';


export default class Form extends Component {
  state = {
    username:'',
    dataPresent: false
  }

  componentDidMount() {
    var ref = firebase.database().ref("/users");
    ref.orderByChild("email").equalTo(firebase.auth().currentUser.email).once("value").then((snapshot) => {
      this.setState({username:Object.values(snapshot.val())[0].username, dataPresent:true})
      });
  }

  render() {
    if(this.state.dataPresent){
    return (
      <Formik
        initialValues={{ restaurant: '', location: '', number: 0, time: '', description: '', username: this.state.username}}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          addPickUp(values.restaurant, values.location, values.number, values.time, values.description, values.username, () => {
          resetForm(initialValues)
        })
        setSubmitting(false);
      }}
        validationSchema={yup.object().shape({
          restaurant: yup
            .string()
            .required(),
          location: yup
            .string()
            .required(),
          number: yup
            .number()
            .required(),
          time: yup
            .string()
            .required(),
          description: yup
            .string()
            .required()
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <Fragment>
            <Input
              value={values.restaurant}
              onChangeText={handleChange('restaurant')}
              onBlur={() => setFieldTouched('restaurant')}
              placeholder="Restaurant"
            />
            {touched.restaurant && errors.restaurant &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.restaurant}</Text>
            }
            <Input
              value={values.location}
              onChangeText={handleChange('location')}
              placeholder="Location"
              onBlur={() => setFieldTouched('location')}
            />
            {touched.location && errors.location &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.location}</Text>
            }
            <Input
              value={values.number}
              onChangeText={handleChange('number')}
              placeholder="Number of Orders"
              onBlur={() => setFieldTouched('number')}
            />
            {touched.number && errors.number &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.number}</Text>
            }
            <Input
              value={values.time}
              onChangeText={handleChange('time')}
              onBlur={() => setFieldTouched('time')}
              placeholder="Time"
            />
            {touched.time && errors.time &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.time}</Text>
            }
            <Input
              value={values.description}
              onChangeText={handleChange('description')}
              placeholder="Description"
              onBlur={() => setFieldTouched('description')}
            />
            {touched.number && errors.number &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.number}</Text>
            }
            <Button
              title='Submit Order'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </Fragment>
        )}
      </Formik>
    );
  }
  else{
    return(
    <View>
      <Text> Loading Data </Text>
    </View>
  );
  }
  }
}
