import React, { useContext,createContext,useState} from "react";
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

    const [mail, setMail] = useState(sessionStorage.getItem("id") || "");
    const login=async()=>{
        try {
            await signInWithEmailAndPassword(auth,user.mail,user.password);
            alert("Welcome ! Enjoy Shopping ");
            sessionStorage.setItem('id',user.mail)
            setMail(user.mail)
            setUser({});
        } catch (error) {
            alert(error);
        }
    }

    return(
        <authContext.Provider value={{register,login,user,setUser,mail}}>
            {children}
        </authContext.Provider>
    )
}