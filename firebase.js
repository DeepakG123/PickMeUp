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
  var r1;
    firebase.database().ref("/users").orderByChild("email").equalTo(firebase.auth().currentUser.email).once("value").then((snapshot) => {
       r1 = Object.values(snapshot.val())[0].username;
       return r1;
    }).then(function(result1){
    firebase
      .database()
      .ref('orders/')
      .push({
        Restaurant: Restaurant,
        Location: Location,
        Number: Number,
        Time: Time,
        Description: Description,
        Username: r1
      })
    })
    addPickUpUser(Restaurant, Location, Number, Time, Description);
}

export function addRequest(Restaurant, Location, Number, Time, Description, Requester, Deliverer){
  firebase
    .database()
    .ref('requests/')
    .push({
      Restaurant: Restaurant,
      Location: Location,
      Number: Number-1,
      Time: Time,
      Description: Description,
      Requester: Requester,
      Deliverer: Deliverer
    });
}

export function addPickUpUser(Restaurant, Location, Number, Time, Description){
  var r1;
  firebase.database().ref("/users").orderByChild("email").equalTo(firebase.auth().currentUser.email).once("value").then((snapshot) => {
     r1 = Object.values(snapshot.val())[0].username;
     return r1;
  }).then(function(result1){
    firebase.database().ref('users/'+  r1  + '/orders/').push({
        Restaurant: Restaurant,
        Location: Location,
        Number: Number,
        Time: Time,
        Description: Description
      })
  })
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


export function getUser(email){
  return firebase
    .database()
    ref.child('users').orderByChild('email').equalTo(email)
}

export default firebase;
