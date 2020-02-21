import React, {createContext, useState} from 'react'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    return(
        <AuthContext.Provider value={{token, setToken}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider