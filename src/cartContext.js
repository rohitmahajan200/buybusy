import React,{ useContext,createContext,Children, useState } from "react";
import { db } from "./firebaseinit";
import { collection, doc,getDocs, setDoc, updateDoc, where, query, arrayUnion,arrayRemove,getDoc } from "firebase/firestore";
const cartContext=createContext();

export const useCartValues=()=>{
    const value=useContext(cartContext);
    return value;
}

// async function orders() {

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }

// }








export default function CustomeCartAuth({children}){
    const [cartitem,setCart]=useState({});
    const[cart,setCarts]=useState([]);
    //const[cartValue,setCartValue]=useState(0);

    //console.log("item in cart ",cartitem);
    
    const mail=sessionStorage.getItem('id');
    let cartRef;
    let q=query(collection(db,"users"), where("email", "==" , mail));
    
    const addToCart=async()=>{
    try {
        cartRef = await getDocs(q);
        //setTotal();
        if(mail){
            //setCartValue(cartValue+cartitem.price); 
            // console.log("Cart Item Price:", cartitem.price);
                //const update=
                cartRef.docs.map(async(doc,index)=>{
                    //console.log("cart in ref ",doc.data().cart[index]);
                    await updateDoc(doc.ref,{
                        cart:arrayUnion({
                            item:cartitem.id,
                            qty:1,
                            price:cartitem.price,
                            totalAmount:cartitem.price
                        })
                    })
                    //await Promise.all(update)
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

    const updateCart=async(flag,name,quantity,price)=>{
        console.log(flag,name,quantity,price);
        
        cartRef = await getDocs(q);
        const itemToUpdate=String(name);
        //setCartValue(cartValue+price);
        try {
            if(flag==="A"){
                    cartRef.docs.forEach(async(doc)=>{
                        await updateDoc(doc.ref,{
                            cart: arrayRemove({
                                item:itemToUpdate,
                                qty:quantity,
                                price:price,
                                totalAmount:quantity*price})
                        })
                        await updateDoc(doc.ref,{
                            cart:arrayUnion({
                                item:itemToUpdate,
                                qty:quantity+1,
                                price:price,
                                totalAmount:(quantity+1)*price})
                        })
                        //setTotal();
                        alert("Count Incremented!!");
                    }); 
            }
            else if(quantity>1){
                //setCartValue(cartValue-price);
                //setTotal();
                cartRef.docs.forEach(async(doc)=>{
                    await updateDoc(doc.ref,{
                        cart: arrayRemove({item:name,qty:quantity,price:price,totalAmount:quantity*price})
                    })
                    await updateDoc(doc.ref,{
                        cart:arrayUnion({item:name,qty:quantity-1,price:price,totalAmount:(quantity-1)*price})
                    })
                    //setTotal();
                    alert("Count Decremented!!");
                }); 
            }
        }
        catch (error) {
            alert("Error while updating to cart");    
        } }

        async function removeFromCart(name,quantity,price){
            console.log("name:",name," quantity:",quantity);
            
            cartRef = await getDocs(q); 
            const itemToRemove=String(name);           
        try {
              const promises=cartRef.docs.map(async(doc)=>{
                //console.log(doc.ref);
              await updateDoc(doc.ref,{
              cart :arrayRemove({
                item:itemToRemove,
                qty:quantity,
                price:price,
                totalAmount:quantity*price})
              })
              });
              await Promise.all(promises);
              //setTotal();
              alert("Item Removed!!");
        }
        catch (error) {
            alert("Error while removing item from cart");    
        } }

        async function setTotal() {
            cartRef.docs.forEach((doc)=>{
                doc.data().cart.map((item)=>{
                     console.log(item.totalAmount);
                })
            })
        }
        
    return(
        <cartContext.Provider value={{addToCart,setCart,updateCart,removeFromCart,cart,setCarts}}>
            {children}
        </cartContext.Provider>
    )
}
