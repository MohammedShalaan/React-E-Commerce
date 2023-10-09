import { createContext, useState } from "react";



export const UserContext = createContext();


function UserContextProvider(Propes) {

    let [UserToken, setUserToken] = useState(null)





    return (
        <UserContext.Provider value={{ UserToken, setUserToken }}>

            {Propes.children}

        </UserContext.Provider>
    )




}


export default UserContextProvider