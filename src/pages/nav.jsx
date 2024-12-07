import React, { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import "./nav.css"
export default function Navbar(){
    const [mail,setMail]=useState(sessionStorage.getItem("id"));
    useEffect(()=>{
        const handleStorageChange = () => {
        const userid=sessionStorage.getItem("id");
        setMail(userid||"")
    };
    window.addEventListener("storageChange",handleStorageChange);

    return()=>{
        window.removeEventListener("storageChange",handleStorageChange)
    };
    },[]);

    function clearSession() {
        sessionStorage.removeItem("id");
        const event=new Event("storageChange");
        window.dispatchEvent(event);
        setMail("");
    }

    return(
        
        <div>
        <div className="bar">
        <span><i class="fa-solid fa-b"></i><i class="fa-solid fa-b"></i><strong><i>....Buy Busy....</i></strong></span>
        
        <Link className="link" to={'/'}><i class="fa-solid fa-house">_Home</i></Link>
        
        {mail ? <Link className="link" to={'/cart'}><i class="fa-solid fa-cart-shopping">_Cart</i></Link> : null}
        
        {mail ? <Link className="link" to={'cart/orders'}><i class="fa-solid fa-bag-shopping">_Orders</i></Link> : null}

        {mail ? <Link to={'/'} className="link" onClick={clearSession}><i class="fa-solid fa-right-from-bracket">_Logout</i></Link> : <Link to={'/login'}><i class="fa-solid fa-right-to-bracket">_Sign In</i></Link>}
        </div>
        
        <Outlet />
        </div>
    )
}