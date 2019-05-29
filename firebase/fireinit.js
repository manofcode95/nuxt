const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import { FIREBASE } from "@/config/development";
var firebaseConfig = {
  apiKey: FIREBASE.API_KEY,
  authDomain: `${FIREBASE.PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE.DATABASE_NAME}.firebaseio.com`,
  projectId: `${FIREBASE.PROJECT_ID}`,
  storageBucket: `${FIREBASE.PROJECT_ID}.appspot.com`,
  messagingSenderId: FIREBASE.SENDER_ID,
  appId: FIREBASE.APP_ID
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const db = firebase.firestore();
export const fbAuth = firebase.auth();
export default firebase;
