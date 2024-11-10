import React,{useEffect, useState} from "react"
import { useCartValues } from "../cartContext";
import { query,collection,where,getDocs } from "firebase/firestore";
import { db } from "../firebaseinit";
export default function Order(){
    const{cart}=useCartValues([]);
    const[order,setOrder]=useState([]);
    const mail=sessionStorage.getItem('id');
    let newCartRef;
    let q=query(collection(db,"users"), where("email", "==" , mail));
    
    const[orderList,setOrderList]=useState([]);

    useEffect(()=>{
        async function getOrder() {
            newCartRef = await getDocs(q);
            newCartRef.docs.map((item,index)=>{
                setOrderList(item.data().orders);
            }) 
        }
        getOrder()
    },[cart,setOrderList])
    

    return(
        <>
        <p>Here are your orders!!!!</p> 
        {orderList.map((item,index)=>{
           return(
            <div>
            <p>Ordered On - {item.date}</p>
            ---------------------------------------------------------------------
            <p>Name-{item.name}</p>
            <p>Price-{item.price}</p>
            <p>Quantity-{item.qty}</p>
            <p>Total Quantity-{item.totalAmount}</p>
            ----------------------------------------------------------------------
            </div>
           )
        })
           
            
        }     
        </>
    )
}