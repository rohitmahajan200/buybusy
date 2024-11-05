import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebaseinit"
import React, { useEffect, useState } from "react"
import { useCartValues } from "../cartContext";
export default function Home(){
const [product,setProduct]=useState([]);//to store the fetch data from database
    useEffect(()=>{
        async function getProducts(){
            const products= await getDocs(collection(db,"products"));            
            const productList=products.docs.map((doc)=>(
                {
                        id:doc.id,
                        ...doc.data()
                }))                
            setProduct([...productList])
        }
        getProducts();         
    },[])
    
    const {addToCart,setCart}=useCartValues()
    const handleaddTocart=(e,id,price)=>{
        console.log("in handle add to cart ",id," price ",price);
        
        e.preventDefault();        
        setCart({'id':id,'price':price});
        addToCart();
    }
    
    return(<>
    {
        product.map((prod)=>(
            <div key={prod.id}>
                <img src={prod.image} alt={prod.name} />
                <br />
                <p>{prod.name}</p>
                <br />
                <p>Price={prod.price} RS</p>
                <button onClick={(e)=>handleaddTocart(e,prod.id,Number(prod.price))}>Add To Cart</button>
                <p>--------------------------------------</p>
            </div>
        ))
    }
    </>)

}