import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBgbLkc7a5XLLdygP9GXnXaM5Vrovp2dC8',
  authDomain: 'star-hunter-game.firebaseapp.com',
  projectId: 'star-hunter-game',
  storageBucket: 'star-hunter-game.appspot.com',
  messagingSenderId: '489638872930',
  appId: '1:489638872930:web:b76a029d8fd9fb1233ce3b',
  measurementId: 'G-93VGPT7HB0'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
