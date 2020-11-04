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

export function storeHighScore() {
  firebase
    .database()
    .ref('users/' + 2)
    .set({
      highscore: 12,
    });
}

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
