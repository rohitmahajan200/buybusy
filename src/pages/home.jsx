import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebaseinit"
import React, { useEffect, useState } from "react"
import { useCartValues } from "../cartContext";
import './home.css'
export default function Home(){
const [product,setProduct]=useState([]);//to store the fetch data from database
const[type,setType]=useState([]);
const[range,setRange]=useState(0);
const [filterProductList,setFilterProductList]=useState([]);
    useEffect(()=>{ 
        async function getProducts(){
            const products= await getDocs(collection(db,"products")); //fetching products for sale        
            const originalProductList=products.docs.map((doc)=>(
                {
                        id:doc.id,
                        ...doc.data()
                }))
            setProduct([...originalProductList]);
            setFilterProductList(originalProductList)
        }
        getProducts()    
    },[])
    
    function changeType(typeToSet) {
        setType((prevType)=>{
            if(prevType.includes(typeToSet)){
                return prevType.filter((item)=>item!=typeToSet);
            }
        else{
            return [...prevType,typeToSet];
        }
        }); // Update the type state
    }
    useEffect(()=>{ 
        
        function applyFilters() {
            let filteredList = [...product];
            if (type.length>0) {
                filteredList = filteredList.filter((item)=>type.includes(item.type));
                setFilterProductList(filteredList)
            }
            // Apply range filter
            if (range > 0) {
                filteredList = filteredList.filter((item) => item.price <= range);
            }
            setFilterProductList(filteredList); // Update the product state with filtered data
            }
        
       
        applyFilters()
    },[range,type,product])
    
         
    const {addToCart}=useCartValues()
    const handleaddTocart=async(name,id,price)=>{ //here we directly passing argument to function without using state for a bug fix
        const newitem={id,name,price}
        try {
            await addToCart(newitem); 
        } catch (error) {
            alert("error while adding to cart=>",error)
        }
    }
    
    return(
    <>
    {
        <div className="filterbody">
            <div className="filter">
            <b>__________Filter____________<i class="fa-solid fa-filter"></i></b>
            <br/>
            <input className="filters" type="range" min={0} max={1300} step={5}  name="filterRange" value={range} onChange={(e)=>setRange(Number(e.target.value))}/>
            <label for="filterRange">{range}</label>
            <br/>
            <b><p>______Catagories_______</p></b>
            <input className="filters" type="checkbox" name="type" value={"idol"} onChange={(e)=>changeType(e.target.value)} />
            <label for="idol">Idols</label>
            <br/>
            <input className="filters" type="checkbox" name="type" value={"tshirt"} onClick={(e)=>changeType(e.target.value)} />
            <label for="Tshirt">Tshirts</label>
            <br/>
            <input className="filters" type="checkbox" name="type" value={"bags"} onClick={(e)=>changeType("bags")}/>
            <label for="bags">Bags</label>
            <br/>
            <input className="filters" type="checkbox" name="type" value={"shoes"} onClick={(e)=>changeType("shoes")} />
            <label for="shoes">Shoes</label>
            <br/>
            <input className="filters" type="checkbox" name="type" value={"books"} onClick={(e)=>changeType("books")} />
            <label for="books">Books</label>
            </div>

            <div className="product-wall">
            {
            filterProductList.map((prod)=>(                 
            <div key={prod.id} className="product">
                <img src={prod.image} alt={prod.name} />
                <br/>
                <p>{prod.name}</p>
                <br />
                <p>Price={prod.price} RS</p>
                <button className="homebtn" onClick={(e)=>handleaddTocart(prod.name,prod.id,Number(prod.price))}>Add To Cart</button>
            </div>
            ))
            }
            </div>
        </div>
    }
    </>)

}