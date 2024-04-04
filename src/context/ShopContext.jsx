import React, { createContext, useState } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    
    const [user,setUser]=useState("")
    const [tot,setTot]=useState(0)

    const contextValue = {
        user,
        setUser,
        tot,
        setTot
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};