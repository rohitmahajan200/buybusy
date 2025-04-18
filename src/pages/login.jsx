import React,{ useEffect } from "react"
import { Link,useNavigate} from "react-router-dom"
import { useAuthValue} from "../authContext"
import './login.css'
export default function Login(){
    const {login,setUser,user,mail}=useAuthValue();
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        await login();
        const mail=sessionStorage.getItem('id');
        const event=new Event("storageChange");
        window.dispatchEvent(event);
        if(mail){
            navigate('/');
        }
    }
    return(
        <div id="parent">
        <form onSubmit={handleLogin}>
        <input value={user.mail} id="mail" placeholder="Email" type="email" onChange={(e)=>setUser({name:"",mail:e.target.value})}/>
        <br/>
        <input value={user.password} id="password" placeholder="Password" type="password" onChange={(e)=>setUser({name:"",mail:user.mail,password:e.target.value})}/>
        <br/>
        <button id="btn">Login</button>
        <br/>
        <Link to={'/register'}>Not have an account?</Link>
        </form>
        </div>
    )
}