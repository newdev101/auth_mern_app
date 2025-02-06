import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {

  const [singnupInfo, setSignupInfo] = useState({
    name:'',
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const handleChange = (e)=>{
    const {name, value} = e.target;
    // console.log(name,value);
    const  copySignupInfo = {...singnupInfo};
    copySignupInfo[name]=value;
    setSignupInfo(copySignupInfo);
  }
  

  const handleSignup= async (e)=>{
    e.preventDefault();
    const {name, email, password}=singnupInfo;
    if(!name || !email || !password){
        return handleError('All fields are required!!');
    }
    try{
        const url = `${process.env.REACT_APP_BACKEND_BASE_API_URL}auth/signup`;
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(singnupInfo)
        });
        const result = await response.json();
        const {success,message,error}=result;
        if(success){
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }else if(error){
            const details = error?.details[0].message;
            handleError(details);
        }else if(!success){
            handleError(message);
        }
        console.log(result);
    } catch(err){
        handleError(err);
    }
  }

  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor="name">Name:</label>
                <input  
                    onChange={handleChange}
                    type='text' 
                    name='name' 
                    placeholder='rajat jana' 
                    value={singnupInfo.name}
                    autoFocus
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input  
                    onChange={handleChange}
                    type='email' 
                    name='email' 
                    placeholder='rajat@gmail.com'
                    value={singnupInfo.email} 
                    
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input  
                    onChange={handleChange}
                    type='password' 
                    name='password' 
                    placeholder='Enter your password'
                    value={singnupInfo.password}
                    
                />
            </div>
            <button type='submit'>Signup</button>
            <br />
            <span>Already have an account?
                <Link to="/login">Login</Link>
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup