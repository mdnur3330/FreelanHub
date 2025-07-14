import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import { app } from '../Component/firebase';
import axiosSecure from '../Hooqs/useAxiosSecure';
const auth = getAuth(app)

export const AuthContext = createContext()

const provider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUserByEmail = (email,password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const  signIN = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    
    const  signInWithGoogle = ()=>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

     const refetchUser = async () => {
    if (!user?.email) return;
    const res = await axiosSecure.get(`/user-details/${user.email}`);
    setUserData(res.data);
  };

    const logOut = ()=>{
        return signOut(auth)
    }



    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    const userInfo = {
        createUserByEmail,
        signIN,
        signInWithGoogle,
        logOut,
        refetchUser,
        user,
        userData,
        loading
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;