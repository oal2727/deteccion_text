import React,{useEffect,useContext} from 'react'
import {AuthReducer} from "../actions/AuthReducer"
import Auth from "../api/auth"

const AuthContext = React.createContext();
const AuthContextProvider = ({children})=>{
    const initialState={
        auth:false,
        spinner:true,
        message:{show:false,description:null},
        userToken:false,
    };

    const [authUser,dispatch] = React.useReducer(AuthReducer,initialState)

    useEffect(() => {
        dispatch({"type":"TOOGLE_SPINNER","payload":true})
        Auth.Me().then(() => {
           dispatch({"type":"TOOGLE_AUTH","payload":true})
           dispatch({"type":"TOOGLE_SPINNER","payload":false})
           return
        }).catch(()=>{
            dispatch({"type":"TOOGLE_AUTH","payload":false})
            dispatch({"type":"TOOGLE_SPINNER","payload":false})
        })
        }, [])
    
   return(
    <AuthContext.Provider value={{
        authUser,dispatch
    }}>
        {children}
    </AuthContext.Provider>
   )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useMyAppContext debe utilizarse dentro de un MyAppProvider');
    }
    return context;
  };

export default AuthContextProvider