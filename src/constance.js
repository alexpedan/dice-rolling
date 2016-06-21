import firebase from "firebase";


export const FIREBASE_URL = "https://dice-rolling-d0a1f.firebaseio.com";
const FIREBASE_CONFIG = {
	apiKey: "ehqdKmA1xzSmiQ05SubHfC7ofKZt9fXbiQ5ipT5V",
	databaseURL: FIREBASE_URL
};

export const appFirebase = firebase.initializeApp(FIREBASE_CONFIG);
export const database = appFirebase.database();
