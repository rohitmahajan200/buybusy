import React,{ useContext,createContext, useState } from "react";
import { db } from "./firebaseinit";
import { collection, doc,getDocs, updateDoc, where, query, arrayUnion,arrayRemove,getDoc,deleteField } from "firebase/firestore";
const cartContext=createContext();

export const useCartValues=()=>{
    const value=useContext(cartContext);
    return value;
}

export default function CustomeCartAuth({children}){  
    const[cart,setCarts]=useState([]);
    const mail=sessionStorage.getItem('id');
    let cartRef; 
    let newCartRef;
    let q=query(collection(db,"users"), where("email", "==" , mail));
    const addToCart=async(newitem)=>{
    try {
        cartRef = await getDocs(q);
        if(mail){
                for(const doc of cartRef.docs){
                    await updateDoc(doc.ref,{
                        cart:arrayUnion({
                            item:newitem.id,
                            name:newitem.name,
                            qty:1,
                            price:newitem.price,
                            totalAmount:newitem.price
                        })
                    })
                    alert("item added to cart");
                }; 
        }
        else{
            alert("please login first!!")
        }
    }
    catch (error) {
        alert(error);    
    } }

    const deletCart=async()=>{
        const newCatRef = doc(db, 'users', cartRef.docs[0].id );
            await updateDoc(newCatRef, {
             cart: deleteField()
        });
    }
    const updateCart=async(flag,name,item,quantity,price)=>{
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

        async function removeFromCart(name,item,quantity,price){
            cartRef = await getDocs(q); 
            const itemToRemove=String(item);           
        try {
              cartRef.docs.map(async(doc)=>{
              await updateDoc(doc.ref,{
              cart :arrayRemove({
                item:itemToRemove,
                name:name,
                qty:quantity,
                price:price,
                totalAmount:Number(quantity*price)})
              })
              });
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
                let newCart=doc.data().cart;//getting items in cart to place order........
                if(newCart){
                    newCart.map(async(item,index)=>{
                        await updateDoc(doc.ref,{
                            orders:arrayUnion({
                                name:item.name,
                                qty:item.qty,
                                price:item.price,
                                totalAmount:item.totalAmount,
                                date:Date()
                            })
                        })
                    })
                }
                else{
                    return
                }
               
        });
        deletCart("D");
        alert("order has been placed")
    }catch(err){
        console.log(err);
        
    }
    }
        
    return(
        <cartContext.Provider value={{addToCart,updateCart,removeFromCart,cart,setCarts,placeOrder,newCartRef}}>
            {children}
        </cartContext.Provider>
    )

}
