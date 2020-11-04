import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC5HUdohz23mfaIv-Cj6VIRX5Ibzk4d15Q",
    authDomain: "pickmeup-c7ffd.firebaseapp.com",
    databaseURL: "https://pickmeup-c7ffd.firebaseio.com",
    projectId: "pickmeup-c7ffd",
    storageBucket: "pickmeup-c7ffd.appspot.com",
    messagingSenderId: "622040403146",
    appId: "1:622040403146:web:a578639a873eeb1bc03833",
    measurementId: "G-S92Y9H7EBE"
};

firebase.initializeApp(firebaseConfig);

export function addPickUp(Restaurant, Location, Number, Time, Description){
  firebase
    .database()
    .ref('orders/')
    .push({
      Restaurant: Restaurant,
      Location: Location,
      Number: Number,
      Time: Time,
      Description: Description
    });
}

export function addUser(username, email, name){
  firebase
    .database()
    .ref('users/' + username)
    .set({
      name: name,
      username: username,
      email: email,
      credits: 200, 
      profile_picture: null
    });
}

export function getOrders(){
  firebase
    .database()
    .ref('orders/')
    .once('value')
    .then(snapshot => {
      console.log('Orders: ', snapshot.val());
    });
}

export function getUser(email){
  return firebase
    .database()
    ref.child('users').orderByChild('email').equalTo(email)
}

export default firebase;
