import { db } from "../FirebaseConfig"
import {addDoc , collection} from "firebase/firestore"
import {toast} from "react-toastify"
let dbRef = collection(db , "posts")

export const postStatus = (status) => {
    let obj = { 
        status : status
    }
    addDoc(dbRef , obj)
    .then(() => {
        toast.success('Post Created');
    })
    .catch((err) => {
        console.log(err);
    });
};