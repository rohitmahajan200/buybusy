import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebaseinit"
import React, { useEffect, useState } from "react"
import { useCartValues } from "../cartContext";
export default function Home(){
const [product,setProduct]=useState([]);//to store the fetch data from database
const[type,setType]=useState("");
const[range,setRange]=useState(0);
    useEffect(()=>{ 
        async function getProducts(){
            const products= await getDocs(collection(db,"products")); //fetching products for sale        
            const productList=products.docs.map((doc)=>(
                {
                        id:doc.id,
                        ...doc.data()
                }))
             
            setProduct([...productList]);
        }
        getProducts()        
    },[setProduct])

    useEffect(()=>{ 
        async function filterRange(){ //to filter data accourding to price
        let productList=[]
        product.map((item,index)=>{
            console.log("price-",item.price," Range-",range," result-",item.price <= range);
            if(item.price <= range){
                productList.push(item);  
        }                  
        })
        console.log("range List ",productList);   
        setProduct(productList)
    }
        filterRange()        
    },[range])

    const {addToCart,setCart}=useCartValues()
    const handleaddTocart=async(name,id,price)=>{        
        //e.preventDefault();        
        await setCart({'id':id,'name':name, 'price':price});
        addToCart();
    }
    
    function changeType(typeToSet){
        if(typeToSet!=null){
        let productList=[]
        product.map((item,index)=>{
            if(item.type==typeToSet){
                productList.push(item);  
        }              
        })
        setProduct(productList)
        }       
    }
    
    return(<>
    {
        <div>
            ___________________________________________________________________________
            <div>
            <b>Filter</b>
            <p>Catagories</p>
            
            <input type="range" min={1} max={500} step={5}  name="filterRange" value={range} onChange={(e)=>setRange(Number(e.target.value))}/>
            <label for="filterRange">{range}</label>

            <input type="checkbox" name="idol" value={"idol"} onChange={(e)=>changeType(e.target.value)} />
            <label for="idol">Idols</label>
            
            <input type="checkbox" name="Tshirt" value={"tshirt"} onClick={(e)=>changeType(e.target.value)} />
            <label for="Tshirt">Tshirts</label>
            
            <input type="checkbox" name="bags" value={"bags"} onClick={(e)=>changeType("bags")}/>
            <label for="bags">Bags</label>
            
            <input type="checkbox" name="shoes" value={"shoes"} onClick={(e)=>changeType("shoes")} />
            <label for="shoes">Shoes</label>

            <input type="checkbox" name="books" value={"books"} onClick={(e)=>changeType("books")} />
            <label for="books">Books</label>
            </div>
            _______________________________________________________________________________
            
            {

            product.map((prod)=>(                 
            <div key={prod.id}>
                <img src={prod.image} alt={prod.name} />
                <br />
                <p>{prod.name}</p>
                <br />
                <p>Price={prod.price} RS</p>
                <button onClick={(e)=>handleaddTocart(prod.name,prod.id,Number(prod.price))}>Add To Cart</button>
                <p>--------------------------------------</p>
            </div>
            ))
            }
        </div>
    }
    </>)

}