import { db } from "../FirebaseConfig"
import {addDoc , collection, onSnapshot, doc, updateDoc,
    query, where, getDocs, getDoc, setDoc, deleteDoc
} from "firebase/firestore"
import {toast} from "react-toastify"


let dbRef = collection(db , "posts") //this is the reference to the posts postRef
let userRef = collection(db , "users")
let likeRef = collection(db, "likes")
let commentRef = collection(db, "comments")

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

export const likePost = (userId, postId, liked) => {
    try{
        let docToLike = doc(likeRef, `${userId}_${postId}`);

        if(liked){
            deleteDoc(docToLike);
        }
        else{
            setDoc(docToLike, {postId, userId}); 
        }
        
    }
    catch(err){
        console.log(err);

    }
}

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) =>{
    try{
        let likeQuery = query(likeRef, where('postId', "==", postId));
        onSnapshot(likeQuery, (response) =>{
            let likes = response.docs.map((doc) => doc.data());
            // console.log(likes);

            let likesCount = likes?.length;
            const isLiked = likes.some((like) => like.userId === userId);

            // console.log(likesCount);
            setLikesCount(likesCount);
            setLiked(isLiked);

        });
    }
    catch(err){
        console.log(err);
    }
}

export const postComment = (postId , comment, timeStamp ,name) =>{
    try{
        addDoc(commentRef, {postId, comment, timeStamp , name});
    }
    catch(err){
        console.log(err);s
    }
}
export const getComments = (postId , setShowComments) =>{
    try{
        let commentQuery = query(commentRef, where('postId', "==", postId));
        onSnapshot(commentQuery, (response) =>{
            // setComments(response.docs.map((doc) => doc.data()));
            const comments = response.docs.map((doc) => {
                return {
                    id : doc.id,
                ...doc.data(),
            };
            }
            );
            setShowComments(comments);
        });
    }
    catch(err){
        console.log(err);
    }
}