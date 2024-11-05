//import './App.css';
import React from "react";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./pages/nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Order from "./pages/order";
import CustomAutContext from "./authContext";
import CustomeCartAuth from "./cartContext";
function App() { 
  const router =createBrowserRouter(
    [
      {path:'/',element:<Navbar />,children:[
        {path:'/',element:<Home />},
        {path:'/login',element:<Login />},
        {path:'/cart',element:<Cart />},
        {path:'/register',element:<Register />},
        {path:'/cart/orders',element:<Order />}
      ]}
    ]
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
