import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile , GoogleAuthProvider} from 'firebase/auth';
import { app } from '../Component/firebase';
const auth = getAuth(app)

export const AuthContext = createContext()

const provider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const createUserByEmail = (email,password)=> {
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const  signIN = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const  signInWithGoogle = ()=>{
        return signInWithPopup(auth, provider)
    }

    const updateUserProfile = ()=>{
        return updateProfile(auth.currentUser,{})
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    const userInfo = {
        createUserByEmail,
        signIN,
        signInWithGoogle,
        updateUserProfile,
        user
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;