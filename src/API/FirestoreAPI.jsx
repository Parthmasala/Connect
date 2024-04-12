import { db } from "../FirebaseConfig";
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

let dbRef = collection(db, "posts"); //this is the reference to the posts postRef
let userRef = collection(db, "users");
let likeRef = collection(db, "likes");
let commentRef = collection(db, "comments");
let connectionRef = collection(db, "connections");
let resumeRef = collection(db, "resumes");
let messageRef = collection(db, "messages");

export const postStatus = (obj) => {
    addDoc(dbRef, obj)
        .then(() => {
            toast.success("Post Created");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getStatus = (setAllStatus) => {
    onSnapshot(dbRef, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const postUserData = async (obj) => {
    try {
        const userSnapshot = await getDocs(
            query(userRef, where("email", "==", obj.email))
        );
        if (!userSnapshot.empty) {
            toast.info("Welcome Back");
            return;
        }

        await addDoc(userRef, obj);
        toast.success("User Created");
    } catch (error) {
        console.log(error);
    }
};

export const getCurrentUser = (setUserData) => {
    let currmail = localStorage.getItem("userEmail");
    onSnapshot(userRef, (response) => {
        setUserData(
            response.docs
                .map((docs) => {
                    return { ...docs.data(), userid: docs.id };
                })
                .filter((user) => {
                    return user.email === localStorage.getItem("userEmail");
                })[0]
        );
    });
};

export const editProfile = (userID, payLoad) => {
    let userToEdit = doc(userRef, userID);

    updateDoc(userToEdit, payLoad)
        .then(() => {
            toast.success("Profile Updated");
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(dbRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })[0]
        );
    });
};

export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};

export const likePost = (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`);

        if (liked) {
            deleteDoc(docToLike);
        } else {
            setDoc(docToLike, { postId, userId });
        }
    } catch (err) {
        console.log(err);
    }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId));
        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data());
            // console.log(likes);

            let likesCount = likes?.length;
            const isLiked = likes.some((like) => like.userId === userId);

            // console.log(likesCount);
            setLikesCount(likesCount);
            setLiked(isLiked);
        });
    } catch (err) {
        console.log(err);
    }
};

export const postComment = (postId, comment, timeStamp, name) => {
    try {
        addDoc(commentRef, { postId, comment, timeStamp, name });
    } catch (err) {
        console.log(err);
    }
};
export const getComments = (postId, setShowComments) => {
    try {
        let commentQuery = query(commentRef, where("postId", "==", postId));
        onSnapshot(commentQuery, (response) => {
            // setComments(response.docs.map((doc) => doc.data()));
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });
            setShowComments(comments);
        });
    } catch (err) {
        console.log(err);
    }
};

export const updatePost = (id, status, postImage) => {
    let docToUpdate = doc(dbRef, id);

    try {
        updateDoc(docToUpdate, { status, postImage });
        toast.success("Post has been Updated");
    } catch (err) {
        console.log(err);
    }
};

export const deletePost = (id) => {
    let docToDelete = doc(dbRef, id);
    try {
        deleteDoc(docToDelete);
        toast.success("Post has been Deleted");
    } catch (error) {
        console.log(error);
    }
};

export const addConnection = (userId, targetId) => {
    try {
        let connectionAdd = doc(connectionRef, `${userId}_${targetId}`);

        setDoc(connectionAdd, { userId, targetId });

        toast.success("Connection Added");
    } catch (err) {
        console.log(err);
    }
};

export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let ConnectionQuery = query(
            connectionRef,
            where("targetId", "==", targetId)
        );
        onSnapshot(ConnectionQuery, (response) => {
            let connections = response.docs.map((doc) => doc.data());
            const isConnected = connections.some(
                (connection) => connection.userId === userId
            );

            // console.log(likesCount);
            setIsConnected(isConnected);
        });
    } catch (err) {
        console.log(err);
    }
};

export const addResume = async (resumeData) => {
    try {
        const resumeSnapshot = await getDocs(
            query(resumeRef, where("name", "==", resumeData.name))
        );

        if (!resumeSnapshot.empty) {
            toast.warning("A resume with the same name already exists");
            return;
        }

        await addDoc(resumeRef, resumeData);
        toast.success("Resume added successfully");
    } catch (error) {
        console.error("Error adding resume:", error);
        toast.error("Failed to add resume");
    }
};

export const saveMessage = (
    senderId,
    senderName,
    receiverId,
    timeStamp,
    message
) => {
    try {
        addDoc(messageRef, {
            senderId,
            senderName,
            receiverId,
            timeStamp,
            message,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getAllMessages = (senderId, receiverId, setMessages) => {
    try {
        let message1Query = query(
            messageRef,
            where("senderId", "==", senderId),
            where("receiverId", "==", receiverId)
        );
        let message2Query = query(
            messageRef,
            where("senderId", "==", receiverId),
            where("receiverId", "==", senderId)
        );

        // Array to hold all messages
        let messages = [];

        // Function to handle snapshot updates
        const handleSnapshot = (snapshot) => {
            const newMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Merge new messages with existing messages
            messages = [...messages, ...newMessages];

            // Update the state with the merged messages
            setMessages(messages);
        };

        // Listen for changes on message1Query
        onSnapshot(message1Query, handleSnapshot);

        // Listen for changes on message2Query
        onSnapshot(message2Query, handleSnapshot);
    } catch (err) {
        console.log(err);
    }
};

export const removeConnection = (userId, targetId) => {
    let docToDelete = doc(connectionRef, `${userId}_${targetId}`);
    try {
        deleteDoc(docToDelete);
        toast.success("Connection Removed");
    } catch (error) {
        console.log(error);
    }
};
