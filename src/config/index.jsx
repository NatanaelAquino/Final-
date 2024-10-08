import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCmD0JypB4ZQMjhgKpg-KYdYqta6J-vZVo",
    authDomain: "sample-firebase-ai-app-8980b.firebaseapp.com",
    projectId: "sample-firebase-ai-app-8980b",
    storageBucket: "sample-firebase-ai-app-8980b.appspot.com",
    messagingSenderId: "768043659510",
    appId: "1:768043659510:web:b903b71e927c96aaa8fcd7"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();
export { firestore, firebase };
