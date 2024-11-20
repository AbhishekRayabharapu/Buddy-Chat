import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {setAuthUser}=useAuthContext()

    const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND_URL // Backend URL from environment variables
      : "http://localhost:5000"; // Default for local development

    const login = async (username, password) =>{
        const success = handleInputErrors(username,password);
        if(!success) return ;
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({username, password})
            })

            const data= await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.setItem("chat-user",JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    };

    return {loading, login};

}

export default useLogin;

function handleInputErrors(username,password){
    if(!username || !password){
        toast.error("please fill all the fields");
        return false ;
    }
    
    return true ;

}

