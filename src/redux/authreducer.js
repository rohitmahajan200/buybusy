import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const auth=getAuth();
const initialState={
    name:'',
    mail:'',
    password:'',
};

export const asyncLogin=createAsyncThunk('"authentication/login"',async(_,{getState})=>{
    const state=getState()
    console.log("STATE---->",state);
    return await signInWithEmailAndPassword(auth,state.mail,state.password);
})

const authSlice=createSlice({
    name:'authentication',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.mail=action.payload.mail;
            state.password=action.payload.password;         
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(asyncLogin.fulfilled,(state,action)=>{
            sessionStorage.setItem('id',state.mail);
            state.name="";
            state.mail="";
            state.password="";     
        })
        .addCase(asyncLogin.rejected,(state,action)=>{
            alert(action.error.message);
        })
    }
})

export const {login} = authSlice.actions;
export const authReducer=authSlice.reducer;
export const authSelector=(state)=>state.authReducer;
