import React, { useContext,createContext,useState } from "react";
import { db, } from "./firebaseinit";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
const auth=getAuth();
const authContext=createContext();

export const useAuthValue=()=>{
    const value=useContext(authContext)
    return value;
}

export default function CustomAutContext({children}){
    
    const [user,setUser]=useState({name:"",mail:"",password:""});
    const[cart,setCart]=useState([]);
    //const docRef=collection(db,"users");
    const register=async()=>{
        //this part handle registration
        try {
            alert("inside register auth");
            await createUserWithEmailAndPassword(auth,user.mail,user.password);//creating user here
            addDoc(collection(db,"users"),
                {
                    name:user.name,
                    email:user.mail,
                    cart:[],
                    orders:[]
                }
                );//Creating cart and orderList at time of user creation
            alert("Registraion Complete Please Login");
            setUser({});
        } catch (error) {
            alert(error);
        }
    }


    const login=async()=>{
        //setUser({mail:user.mail,password:user.password});
        try {
            alert("inside login")
            await signInWithEmailAndPassword(auth,user.mail,user.password);
            alert("Welcome !, Please Login to continue shoppling ");
            sessionStorage.setItem('id',user.mail)
            setUser({});
        } catch (error) {
            alert(error);
        }
    }

    return(
        <authContext.Provider value={{register,login,user,setUser,cart,setCart}}>
            {children}
        </authContext.Provider>
    )
}