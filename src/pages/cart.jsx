import React,{ useEffect, useState ,useRef } from "react"
import { query, collection,getDocs,where,docs, doc,getDoc,getDocFromCache,onSnapshot} from "firebase/firestore";
import { db } from "../firebaseinit";
import { useCartValues } from "../cartContext";
import { Link } from "react-router-dom";
import './cart.css'
export default function Cart(){
    const {updateCart,removeFromCart,cart,setCarts,placeOrder}=useCartValues();

     const[product,setProducts]=useState([]);
     const mail=sessionStorage.getItem('id');
     const[cartValue,setCartValue]=useState(0);
    
     async function fetchData(prod){
        const docRef = doc(db, "products",prod.item);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {        
            return docSnap.data();
        } else {
          console.log("No such document!");
        }
    }

    useEffect(()=>{ //function to retrive product in cart for user who is login...
        async function eff1(){
        let q=query(collection(db,"users"), where("email", "==" , mail));
        const cartRef = await getDocs(q);
        const toSetCart=[];
        cartRef.docs.map((doc,index)=>{  
            const data=doc.data().cart;
            if(data){
                toSetCart.push(...data);
            }
            else{
                return;
            }
            
        })
        setCarts(toSetCart);
        }
        eff1();
    },[mail,setCarts,product])

    useEffect(()=>{ //function to fetch cart data to set in product state
        async function fetchCart(){
        const productPromise=cart.map((prod,index)=>fetchData(prod));
        const productData=await Promise.all(productPromise);
        setProducts(productData.filter(Boolean));
        }
        fetchCart();
    },[cart])

    useEffect(()=>{ //function to set total amount
        async function fetchTotalAmt() {
            let total=0;
            cart.map((item,index)=>{
                total+=item.totalAmount
            })
            setCartValue(total);
        }
        fetchTotalAmt();
    },[cart])
    console.log(cart);
    
    return(
        <div className="cartwall">
            <p>Cartttttt!!!</p>
            <p>{cart.length == 0?"Cart is Empty":null}</p>
            <p>Total price:{cartValue}</p>
            <p>{cart.length != 0? <button className="cartbutton" onClick={placeOrder}><Link to={"orders"}>Purchase</Link></button> :null}</p>
        
            <br/>
            <div>
            {product.map((item,index)=>{
                return(
                    <div key={index} className="cartproduct"> 
                        <img src={item.image} alt={item.name}/>
                        <p>{item.name}</p>
                        <span>
                        <span className="price">{item.price}</span>
                        <button onClick={(e)=>updateCart("A",item.name, cart[index].item, cart[index].qty, cart[index].price)}>+</button>
                        <span>{
                         cart && cart.length>0 ? cart[index].qty:null
                        }
                        <button onClick={(e)=>updateCart("R",item.name, cart[index].item, cart[index].qty, cart[index].price)}>-</button></span>
                        </span>
                        <button className="cartbutton" onClick={(e)=>{removeFromCart(item.name,cart[index].item, cart[index].qty, cart[index].price)}}>Remove From Cart</button>                       
                    </div>
                )
            })}
            </div>
        </div>
        )

    }
