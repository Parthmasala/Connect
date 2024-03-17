import React , {useState} from 'react'
import { LoginAPI , RegisterAPI} from '../API/AuthAPI';
import ConnectLogo from "../assets/ConnectLogo.png";
import GoogleButton from 'react-google-button'
import "../Scss/LoginComponent.scss";


export default function LoginComponent() {
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try
    {
      let response = await LoginAPI(credentails.email , credentails.password);
      console.log(response);
    }
    catch(error){
      console.log(error.errors.message);
    }
  }
  return (
    <div className='login-wrapper'>

        <img src = {ConnectLogo} className = "connectLogo" />

        <div className='login-wrapper-inner'>
        
        <h1 className = "heading">Sign In</h1>
        <p className = "sub-heading">Welcome to Connect</p>


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
            placeholder="Enter your Password" 
            />
        </div>


        <button className='login-btn' onClick={login}>Log In</button>
        
        </div>
        <hr class="hr-text" data-content="OR"></hr>
        <div className='google-btn-container'>
        <GoogleButton className='google-btn'
          onClick={() => { console.log('Google button clicked') }}
        />
        </div>
    </div>
  )
}
