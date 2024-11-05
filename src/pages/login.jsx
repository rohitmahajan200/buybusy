import React from "react"
import { Link } from "react-router-dom"
import { useAuthValue } from "../authContext"
export default function Login(){
    const {login,setUser,user}=useAuthValue();
    const handleLogin=async(e)=>{
        e.preventDefault();
        await login();
    }
    return(
        <>
        <form onSubmit={handleLogin}>
        <input value={user.mail} placeholder="Email" onChange={(e)=>setUser({name:"",mail:e.target.value})}/>
        <br/>
        <input value={user.password} placeholder="Password" onChange={(e)=>setUser({name:"",mail:user.mail,password:e.target.value})}/>
        <br/>
        <button>Login</button>
        <br/>
        </form>
        <Link to={'/register'}>Regsiter</Link>
        </>
    )
}