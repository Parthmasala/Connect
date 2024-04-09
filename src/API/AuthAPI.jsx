//firebase product
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { postUserData } from "./FirestoreAPI";

// let authentication = getAuth();

//API for login
export const LoginAPI = (email, password) => {
  try {
    let response = signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export const RegisterAPI = (email, password) => {
  try {
    let response = createUserWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error;
  }
};

export const GoogleAPI = (email, password) => {
  try {
    const provider = new GoogleAuthProvider();
    // let response = signInWithPopup(auth, googleAccount);

    //to prevent error
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        const name = user.displayName;
        const photoUrl = user.photoURL;

        const userData = {
          email: email,
          name: name,
          imageLink: photoUrl,
        };

        postUserData(userData);
        toast.success("SignIn with Google Account");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

export const onLogout = () => {
  try {
    signOut(auth);
  } catch (error) {
    return error;
  }
};
