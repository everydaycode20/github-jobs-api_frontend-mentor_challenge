import React, {createContext, useState} from "react";

const Provider = props => {

    const [state, setState] = useState({});
    const [state2, setState2] = useState({});

    return (
        <>
        <Context.Provider value={[state, setState]} value={[state2, setState2]} >
            {props.children}
        </Context.Provider>
        </>
    )
}

export default Provider;
export const Context = createContext("");