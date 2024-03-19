import React, { useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth} from "../FirebaseConfig"; 
import Loader from '../components/common/Loader/index.jsx';

export default function Home() {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() =>{
    onAuthStateChanged(auth, (res) => {
      if(!res?.accessToken){
        navigate("/");
      }
      else{
        setLoading(false);
      }
    });
  },[])
  return loading ? <Loader /> : <HomeComponent/>;

}
