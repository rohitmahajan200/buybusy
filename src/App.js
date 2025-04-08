import React from "react";
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Order from "./pages/order";
import Profile from "./pages/profile";
import CustomAutContext from "./authContext";
import CustomeCartAuth from "./cartContext";

function App() { 
  const router =createBrowserRouter(
    // [
    //   {path:'/',element:<Navbar />,children:[
    //     {path:'/',element:<Home />},
    //     {path:'/login',element:<Login />},
    //     {path:'/cart',element:<Cart />},
    //     {path:'/register',element:<Register />},
    //     {path:'/cart/orders',element:<Order />}
    //   ]}
    // ]
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navbar/>}>
          <Route path="" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/cart/orders" element={<Order />}/>
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </Route>
    )
  )
  return (
    <CustomAutContext>
      <CustomeCartAuth>

      <RouterProvider router={router}/>

      </CustomeCartAuth>
    </CustomAutContext>
  );
}
export default App;