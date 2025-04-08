import React from "react"
import { useAuthValue } from "../authContext"
import { Link } from "react-router-dom";
export default function Register(){
    const{register,user,setUser}=useAuthValue();

    const handleSubmit=(e)=>{
        e.preventDefault();
        register();
        setUser({});
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
        <input value={user.name} 
        onChange={(e)=>setUser({name:e.target.value})} placeholder="Name"/>
        <br/> 

        <input value={user.mail} 
        onChange={(e)=>setUser({name:user.name,mail:e.target.value})} placeholder="Email"/>
        <br/>

        <input value={user.password} 
        onChange={(e)=>setUser({name:user.name,mail:user.mail,password:e.target.value})} placeholder="Password"/>
        <br/>

        <button>Regsiter</button>
        <br />
        <Link to={'/login'}>Login</Link>
        <br/>
        </form>
        </>
    )
}