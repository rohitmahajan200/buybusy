const { configureStore } = require("@reduxjs/toolkit");
const { authReducer } = require("./authreducer");

export const store=configureStore({
    reducer:{
        authReducer
    }
})