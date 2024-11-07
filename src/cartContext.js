import React,{ useContext,createContext,Children, useState } from "react";
import { db } from "./firebaseinit";
import { collection, doc,getDocs, setDoc, updateDoc, where, query, arrayUnion,arrayRemove,getDoc } from "firebase/firestore";
const cartContext=createContext();

export const useCartValues=()=>{
    const value=useContext(cartContext);
    return value;
}

export default function CustomeCartAuth({children}){
    const [cartitem,setCart]=useState({});

    const[cart,setCarts]=useState([]);
    
    const mail=sessionStorage.getItem('id');
    let cartRef; 
    let newCartRef;
    let q=query(collection(db,"users"), where("email", "==" , mail));
    
    const addToCart=async()=>{
    try {
        cartRef = await getDocs(q);
        if(mail){
                cartRef.docs.map(async(doc,index)=>{
                    await updateDoc(doc.ref,{
                        cart:arrayUnion({
                            item:cartitem.id,
                            name:cartitem.name,
                            qty:1,
                            price:cartitem.price,
                            totalAmount:cartitem.price
                        })
                    })
                    alert("item added to cart ");
                    setCart({});
                }); 
        }
        else{
            alert("please login first!!")
        }
    }
    catch (error) {
        alert("Error while adding to cart");    
    } }

    //"A",item.name, cart[index].item, cart[index].qty, cart[index].price
    const updateCart=async(flag,name,item,quantity,price)=>{
        //console.log(flag,name,quantity,price);
        
        cartRef = await getDocs(q);
        const itemToUpdate=String(item);
        try {
            if(flag==="A"){
                    cartRef.docs.forEach(async(doc)=>{
                        await updateDoc(doc.ref,{
                            cart: arrayRemove({
                                item:itemToUpdate,
                                name:name,
                                qty:quantity,
                                price:price,
                                totalAmount:Number(quantity*price)})
                        })
                        await updateDoc(doc.ref,{
                            cart:arrayUnion({
                                item:itemToUpdate,
                                name:name,
                                qty:quantity+1,
                                price:price,
                                totalAmount:Number((quantity+1)*price)})
                        })
                        alert("Count Incremented!!");
                    }); 
            }
            else if(quantity>1){
                cartRef.docs.forEach(async(doc)=>{
                    await updateDoc(doc.ref,{
                        cart: arrayRemove({item:itemToUpdate,name,qty:quantity,price:price,totalAmount:quantity*price})
                    })
                    await updateDoc(doc.ref,{
                        cart:arrayUnion({item:itemToUpdate,name,qty:quantity-1,price:price,totalAmount:(quantity-1)*price})
                    })
                    alert("Count Decremented!!");
                }); 
            }
        }
        catch (error) {
            alert("Error while updating to cart");    
        } }

        async function removeFromCart(name,quantity,price){
            cartRef = await getDocs(q); 
            const itemToRemove=String(name);           
        try {
              const promises=cartRef.docs.map(async(doc)=>{
              await updateDoc(doc.ref,{
              cart :arrayRemove({
                item:itemToRemove,
                name:name,
                qty:quantity,
                price:price,
                totalAmount:Number(quantity*price)})
              })
              });
              await Promise.all(promises);
              alert("Item Removed!!");
        }
        catch (error) {
            alert("Error while removing item from cart");    
        } }

        async function placeOrder() {
            try {
            cartRef = await getDocs(q);
            newCartRef=await getDocs(q);
            cartRef.docs.map(async(doc,index)=>{
                doc.data().cart.map(async(item,index)=>{
                    await updateDoc(doc.ref,{
                        orders:arrayUnion({
                            name:item.name,
                            qty:item.qty,
                            price:item.price,
                            totalAmount:item.totalAmount,
                            date:new Date()
                        })
                    })
                })
        });
        alert("order has been placed")
    }catch(err){
        console.log(err);
        
    }
    }
        
    return(
        <cartContext.Provider value={{addToCart,setCart,updateCart,removeFromCart,cart,setCarts,placeOrder,newCartRef}}>
            {children}
        </cartContext.Provider>
    )

}
