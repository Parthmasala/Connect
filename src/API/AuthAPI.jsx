//firebase product
import { auth } from "../FirebaseConfig";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updatePassword,
} from "firebase/auth";
import { postUserData } from "./FirestoreAPI";
import { toast } from "react-toastify";
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
                localStorage.setItem("userEmail", email);
                toast.success("SignIn with Google Account");
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    } catch (error) {
        console.error("Error signing in with Google:", error);
    }
};

export const UpdatePassword = async (newPassword) => {
    try {
        await updatePassword(auth.currentUser, newPassword);
        console.log("Password updated successfully");
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};

export const onLogout = () => {
    try {
        signOut(auth);
        localStorage.clear();
        toast.info("You have logged out");
    } catch (error) {
        return error;
    }
};
