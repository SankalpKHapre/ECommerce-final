import React,{useState} from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state,setState] = useState('Sign Up')
  const [formData,setFormData] = useState({
    username:'',
    password:'',
    email:'',
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log('Login',formData);
    let responseData
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData=data})
    if (responseData.success) {
      localStorage.setItem("auth-token",responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.error)
    }
  }
  const signUp = async()=>{
    console.log('signup',formData);
    let responseData
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json()).then((data)=>{responseData=data})
    if (responseData.success) {
      localStorage.setItem("auth-token",responseData.token)
      window.location.replace('/')
    }
    else{
      alert(responseData.error)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up'?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==='Login'?login():signUp()}}>Continue</button>
        {state === 'Login'?<p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}} >Click here</span></p>:<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState('Login')}} >Login here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
