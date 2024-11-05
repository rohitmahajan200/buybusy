import React,{useEffect} from "react"
import { useCartValues } from "../cartContext";

export default function Order(){
    const{cart,setCarts}=useCartValues();
    useEffect(()=>{ //function to set total amount
        async function fetchTotalAmt() {
            cart.map((item,index)=>{
                console.log(item);
            })
        }
        fetchTotalAmt();
    },[cart])
    return(
        <>
        <p>Here are your orders!!!!</p>
        
        </>
    )
}