import React, { useContext, useEffect, useState } from "react";
import { auth, storage } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { upsertUser } from "../firebase/database";

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser(null);
    return;
  }

  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = await upsertUser(result.user);
        setCurrentUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(function (
      userCredential
    ) {
      userCredential.user.updateEmail("newyou@domain.com");
    });
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateUser(newName) {
    return updateProfile(currentUser, {
      displayName: newName,
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log("Profile info updated");
        console.log(currentUser.displayName, currentUser.photoURL);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  function uploadFile(file) {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesnt have permission to access the object");
            break;
          case "storage/canceled":
            // User canceled the upload
            console.log("User canceled the upload");
            break;

          // ...

          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }
    );
    return uploadTask.then(() => {
      return getDownloadURL(uploadTask.snapshot.ref);
    });
  }

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user && user.uid) {
        await upsertUser(user).then((appUser) => {
          setCurrentUser(appUser);
        });
      }
      // setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    uploadFile,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUser,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
