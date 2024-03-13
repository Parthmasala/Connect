//firebase product
import {signInWithEmailAndPassword , createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../FirebaseConfig';

// let authentication = getAuth();

//API for login
export const LoginAPI = (email , password) => {
    try{
        let response = signInWithEmailAndPassword(auth , email , password) ;
        return response;
    }
    catch(error){
        return error;
    }

};

export const RegisterAPI = (email , password) => {
    try{
        let response = createUserWithEmailAndPassword(auth , email , password) ;
        return response;
    }
    catch(error){
        return error;
    }

};