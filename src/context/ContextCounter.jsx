import React, { createContext } from "react";





export const CounterContext = createContext()

function CounterContextProvider(props) {

    let x = 3;


    return (
        <CounterContext.Provider value={x} >
            {props.children}
        </CounterContext.Provider>
    )
}

export default CounterContextProvider;