import React from "react"
import { Link, Outlet } from "react-router-dom"
export default function Navbar(){
    return(
        <>
        <p>Buy Busy</p>
        <br />
        <Link to={'/'}>Home</Link>
        <br />
        <Link to={'/login'}>Sign In</Link>
        <br />
        <Link to={'/cart'}>Cart</Link>
        <br />
        <Link to={'cart/orders'}>Orders</Link>
        <Outlet />
        </>
    )
}