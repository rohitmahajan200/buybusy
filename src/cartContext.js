import React,{ useContext,createContext,Children, useState } from "react";
import { db } from "./firebaseinit";
import { collection, doc,getDocs, setDoc, updateDoc, where, query, arrayUnion,arrayRemove,getDoc,deleteField } from "firebase/firestore";
import firebase from "firebase/compat/app";
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
    //cartRef = await getDocs(q);

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

    const deletCart=async()=>{
        const newCatRef = doc(db, 'users', cartRef.docs[0].id );
            await updateDoc(newCatRef, {
             cart: deleteField()
        });
    }
    const updateCart=async(flag,name,item,quantity,price)=>{
        //console.log("TO know what is item ",item);
        
        cartRef = await getDocs(q);
        const itemToUpdate=String(item);
        console.log("CArt REf ",cartRef.docs[0].id);
        
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
                //removeFromCart(item.name,cart[index].item, cart[index].qty, cart[index].price)
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

        const formatDateTime = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
          };
        
          // Sample usage: just to show the formatted time
          const currentDateTime = toString(formatDateTime(new Date()));
          
          

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
                                date:currentDateTime
                            })
                        })
                    })
                }
                else{
                    return
                }
               
        });
        console.log("date--",currentDateTime);
        deletCart("D");
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
