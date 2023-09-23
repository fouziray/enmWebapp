// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getMessaging, getToken} from "firebase/messaging";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSRvDLLZsS9SSJPqvMztDkLSeLlH7ijIs",
  authDomain: "notifa-91934.firebaseapp.com",
  projectId: "notifa-91934",
  storageBucket: "notifa-91934.appspot.com",
  messagingSenderId: "1036941030320",
  appId: "1:1036941030320:web:54c173c5452e5397675c75"
};
const firebasemessaagerec={
  apiKey: 'AIzaSyCSRvDLLZsS9SSJPqvMztDkLSeLlH7ijIs',
  authDomain: 'notifa-91934.firebaseapp.com',
  databaseURL: 'https://notifa-91934.firebaseio.com',
  projectId: 'notifa-91934',
  storageBucket: 'notifa-91934.appspot.com',
  messagingSenderId: '1036941030320',
  appId: '1:1036941030320:web:54c173c5452e5397675c75',
  measurementId: 'G-measurement-id',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
getToken(messaging, {vapidKey: "BPFqboY1v2z8LvutMP43RhWDL-9Aw_50Mjoh9AHnhMtSjM-RE38l3fsnT163EvubjuPHU7L8R3cUoyXLSmyrg10"});

export default app;