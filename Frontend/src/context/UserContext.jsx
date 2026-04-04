  /* eslint-disable react-refresh/only-export-components */
 import React, { createContext, useContext, useEffect, useState } from 'react'
 import { authDataContext } from './AuthContext'
 import axios from 'axios'
 export const userDataContext=createContext()
 function UserContext({children}) {
    let [userData,setUserData]=useState(null)
    let {serverUrl}=useContext(authDataContext)

    const getCurrentUser=async ()=>{
        try{
            let result=await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            setUserData(result.data)

        }catch(error){
            console.log(error)
            setUserData([])
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getCurrentUser()
    },[])

    const value={
        userData,
        getCurrentUser
    }
   return (
     <div>
        <userDataContext.Provider value={value}> 
       {children}
         </userDataContext.Provider>
     </div>
   )
 }
 
 export default UserContext
 