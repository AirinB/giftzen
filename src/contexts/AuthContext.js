import React, {useContext, useEffect, useState} from "react"
import {auth} from "../firebase-config";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    console.log(email, password)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
          userCredential.user.updateEmail('newyou@domain.com')
        })
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }


  function updateUser(newName){
    return updateProfile(currentUser, {
      displayName: newName, photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      // Profile updated!
      // ...
      console.log("Profile info updated")
      console.log(currentUser.displayName, currentUser.photoURL);
    }).catch((error) => {
      console.log("Error: " + error);
    });
  }

  useEffect(() => {
    return onAuthStateChanged( auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
