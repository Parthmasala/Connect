import { db } from "../FirebaseConfig"
import {addDoc , collection, onSnapshot, doc, updateDoc,
    query, where, getDocs, getDoc
} from "firebase/firestore"
import {toast} from "react-toastify"


let dbRef = collection(db , "posts") //this is the reference to the posts postRef
let userRef = collection(db , "users")

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

export const postUserData = (obj) => {
    addDoc(userRef , obj)
    .then(() => {
        toast.success('User Created');
    }) 
    .catch((error)=> {
        console.log(error);
    });

}

export const getCurrentUser = (setUserData) => {

    let currmail = localStorage.getItem("userEmail");
    onSnapshot(userRef, (response) =>{
        setUserData (
            response.docs.map((docs) => {
                return {...docs.data(), userid: docs.id};
        }).filter((user) => {
            return user.email === localStorage.getItem("userEmail");  
        })[0]
        )
    })
}

export const editProfile = (userID, payLoad) =>{
    let userToEdit = doc(userRef, userID);

    updateDoc(userToEdit, payLoad)
    .then(() => {
        toast.success('Profile Updated');
    })
    .catch((err) => {
        console.log(err);
    });
};

export const getSingleStatus = (setAllStatus , id) =>{
    const singlePostQuery = query(dbRef , where("userID" , "==" , id));
    onSnapshot(singlePostQuery, (response) =>{
        setAllStatus(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id};
        }));
    });
};

export const getSingleUser = (setCurrentUser , email) =>{
    const singleUserQuery = query(userRef , where("email" , "==" , email));
    onSnapshot(singleUserQuery, (response) =>{
        setCurrentUser(
            response.docs.map((docs) => {
                return {...docs.data(), id: docs.id};
        })[0]);
    });
};
