import React, { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
export default function Navbar(){

    const [mail,setMail]=useState(sessionStorage.getItem("id")||"");

    function clearSession() {
        sessionStorage.removeItem("id");
        setMail("");
    }

    useEffect(()=>{
        setMail(sessionStorage.getItem("id")||"");
    },[]);

    console.log("Mail " ,mail);
    
    return(
        <>
        <p>Buy Busy</p>
        <br />
        <Link to={'/'}>Home</Link>
        <br />
        {mail?<Link  to={'/'} onClick={clearSession}>Logout</Link>:<Link to={'/login'}>Sign In</Link>}
        <br />
        {mail?<Link to={'/cart'}>Cart</Link>:null}
        <br />
        {mail?<Link to={'cart/orders'}>Orders</Link>:null}
        <Outlet />
        </>
    )
}