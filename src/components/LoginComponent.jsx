import React , {useState} from 'react'
import { LoginAPI , RegisterAPI} from '../API/AuthAPI';
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
        <h1>LoginComponent</h1>

        <div className='auth-input'>
          <input onChange={
            (e) => 
            setCredentials({ ...credentails, email: e.target.value })
          }
          type="email"
          className="login-input"
          placeholder="Enter your Email"
          />
          <input onChange={
            (e) => 
            setCredentials({ ...credentails, password: e.target.value })
          }
          type="password"
          className="login-input"
          placeholder="Enter your Email"
          />
        </div>

        <button className='login-btn' onClick={login}>Log In</button>
    </div>
  )
}
