import React , {useState} from 'react'
import { RegisterAPI, GoogleAPI} from '../API/AuthAPI';
import ConnectLogo from "../assets/ConnectLogo.png";
import GoogleButton from 'react-google-button'
import "../Scss/LoginComponent.scss";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function SignupComponent() {
  const [credentails, setCredentials] = useState({});

  let navigate = useNavigate();

  const login = async () => {
    try
    {
      let response = await RegisterAPI(credentails.email , credentails.password);
      toast.success('Successfully Created Account');
      navigate('/home');
      // console.log(response) ;
      localStorage.setItem("userEmail", response.user.email);
    }
    catch(error){
      toast.error('Unable to Create Account');
    }
  }
  const googleLogin = () => {
    let response = GoogleAPI();
    navigate('/home');
  }

  return (
    <div className='login-wrapper'>

        <img src = {ConnectLogo} className = "connectLogo" />

        <div className='login-wrapper-inner'>
        
        <h1 className = "heading">Sign Up</h1>
        <p className = "sub-heading">
            Let's get started
        </p>


        <div className='auth-input'>
          <input onChange={
            (e) => 
            setCredentials({ ...credentails, email: e.target.value })
          }
          type="email"
          className="common-input"
          placeholder="Email or Phone"
          />

          <input onChange={
              (e) => 
              setCredentials({ ...credentails, password: e.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)" 
            />
        </div>


        <button className='login-btn' onClick={login}>Create Account</button>
        
        </div>
        <hr className="hr-text" data-content="or" />
        <div className='google-btn-container'>
          <GoogleButton className='google-btn'
            onClick={googleLogin}
          />
          <p className='signup-link'>
            Already have an account? <span className="register" onClick={() => navigate('/')}>Log In</span>
          </p>

        </div>
    </div>
  )
}
