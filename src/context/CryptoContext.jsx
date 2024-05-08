import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { app } from "./firebase";
import { getFirestore, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {  doc, onSnapshot, collection } from "firebase/firestore";


const Crypto = createContext();

const CryptoContext = ({ children }) => {

  const [user, setUser] = useState(null);
  const [watchList, setWatchlist] = useState([]);


  // intance of firebase auth
  const firebaseAuth = getAuth(app);

  const db = getFirestore(app);
  const col = collection(db,"watchlist");

  const googleAuthPrivider = new GoogleAuthProvider();

  // function to check if user is logged in or not

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // function to login with google
  const googleLogin = () => {
    signInWithPopup(firebaseAuth, googleAuthPrivider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function to register user with email and password
  const Ragister = async (email, password) => {
    try {
      const msg = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      toast.success("Ragistered Successfull !", {
        position: "top-left"
      });
      console.log(msg);
    } catch (error) {
      toast.error("Error Notification !", {
        position: "top-left"
      });
      console.log("ragister ", error);
    }
  };

  // function to login user with email and password
  const Login = async (email, password) => {
    try {
      const msg = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      toast.success("Login Successfull !", {
        position: "top-left"
      });
      console.log(msg);
    } catch (error) {
      toast.error("Error Notification !", {
        position: "top-left"
      });
      console.log("Please Check Your Detail ", error.message);
    }
  };

  // function to add coin to watchlist on runtime
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);


  // function to get watchlist from firebase
  async function getWatchlist() {
    try {
        const docRef = doc(db, "watchlist", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
           return (docSnap.data().coins)
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}

  // function to add coin to watchlist in firebase
  const addWatchlist = async (data) => {
    const coinsRef = doc(db, "watchlist", user.uid);
    try {
      const add =  await setDoc(coinsRef, {
        coins: [...watchList, data],
      }, { merge: true });
      console.log(add, "added")
    } catch (error) {
      console.log("error", error.message);
    }  
  }

  const isLoggedIn = user ? true : false;



  return (
    <Crypto.Provider
      value={{
        watchList,
        addWatchlist,
        setWatchlist,
        getWatchlist,
        Login,
        Ragister,
        googleLogin,
        isLoggedIn,
        firebaseAuth,
        user,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
