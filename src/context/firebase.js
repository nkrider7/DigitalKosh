import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-T5lcuKzfCT7iK3wbI9R8o8ee1VijWCg",
  authDomain: "cryptokosh-e1990.firebaseapp.com",
  projectId: "cryptokosh-e1990",
  storageBucket: "cryptokosh-e1990.appspot.com",
  messagingSenderId: "131535620160",
  appId: "1:131535620160:web:ef7663d5fb02d77962b7a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
