import { initializeApp } from "firebase/app"
const firebaseConfig = {
  apiKey: "AIzaSyAwOo-TuDojvAAjXPV0t8kvvKeKqznFKG0",
  authDomain: "mailme-ce315.firebaseapp.com",
  projectId: "mailme-ce315",
  storageBucket: "mailme-ce315.appspot.com",
  messagingSenderId: "726903740436",
  appId: "1:726903740436:web:e0eabc35306df2c3f12f01",
  measurementId: "G-662QK4R1KT",
};

// Initialize Firebase  
const firebaseApp = initializeApp( firebaseConfig );
export default firebaseApp;
