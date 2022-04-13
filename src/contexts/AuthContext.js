import React, {useContext, useEffect, useState} from "react"
import {auth, storage} from "../firebase-config";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
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
            .then(function (userCredential) {
                userCredential.user.updateEmail('newyou@domain.com')
            })
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }


    function updateUser(newName) {
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

    function uploadFile(file) {
        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('User doesnt have permission to access the object');
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        console.log('User canceled the upload');
                        break;

                    // ...

                    case 'storage/unknown':
                        console.log('Unknown error occurred, inspect error.serverResponse');
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            }
        );
        return uploadTask.then(() => {
            return getDownloadURL(uploadTask.snapshot.ref)
        });
    }

    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        uploadFile,
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
