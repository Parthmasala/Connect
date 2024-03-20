import { db } from "../FirebaseConfig"
import {addDoc , collection, onSnapshot} from "firebase/firestore"
import {toast} from "react-toastify"
let dbRef = collection(db , "posts")

export const postStatus = (obj) => {
    
    addDoc(dbRef , obj)
    .then(() => {
        toast.success('Post Created');
    })
    .catch((err) => {
        console.log(err);
    });
};

export const getStatus = (setAllStatus) =>{
    onSnapshot(dbRef, (response) =>{
        setAllStatus(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id};
        }))
    })
}