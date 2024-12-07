import React,{useEffect, useState} from "react"
import { useCartValues } from "../cartContext";
import { query,collection,where,getDocs } from "firebase/firestore";
import { db } from "../firebaseinit";
import './order.css'
export default function Order(){
    const{cart}=useCartValues([]);
    const[order,setOrder]=useState([]);
    const mail=sessionStorage.getItem('id');
    let newCartRef;
    let q=query(collection(db,"users"), where("email", "==" , mail));
    
    const[orderList,setOrderList]=useState([]);
    console.log(orderList);
    
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
                <strong>Ordered On -{String(item.date).substring(0,21)}</strong>
                <table>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                
                <tr>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>{item.totalAmount}</td>
                </tr>

            </table>
            </div>
           )
        })
           
            
        }     
        </>
    )
}