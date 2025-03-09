import React,{ useEffect, useState } from "react"
import { Link,useNavigate} from "react-router-dom"
import { login,asyncLogin,authSelector, authReducer} from "../redux/authreducer";
import { useDispatch, useSelector } from "react-redux";
export default function Login(){
    const dispatch=useDispatch();
    const authState=useSelector(authSelector);   
    const [loginCred,setLoginCred]=useState({
        mail:'',
        password:''
    });

    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        dispatch(login(loginCred));
        dispatch(asyncLogin());        
        if(sessionStorage.getItem('id')){            
            navigate('/');
        }
    }
    return(
        <>
        <form onSubmit={handleLogin}>
        <input placeholder="Email" type="email" onChange={(e)=>setLoginCred({...loginCred,mail:e.target.value})} />
        <br/>
        <input placeholder="Password" type="password" onChange={(e)=>setLoginCred({...loginCred,password:e.target.value})}/>
        <br/>
        <button>Login</button>
        <br/>
        </form>
        <Link to={'/register'}>Regsiter</Link>
        </>
    )
}