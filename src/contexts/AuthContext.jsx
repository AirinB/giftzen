import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, storage } from '../firebase-config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { upsertUser } from '../firebase/database';
import { pick } from 'ramda';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function signup({ email, password, firstName, lastName }) {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return upsertUser({
          ...user,
          email,
          displayName: `${firstName} ${lastName}`,
          photoURL: `https://robohash.org/${user.uid}`,
        });
      })
      .then(setCurrentUser)
      .catch((error) => {
        console.error(error);
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
    setCurrentUser(null);
    return;
  }

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => upsertUser(result.user))
      .then((user) => setCurrentUser(user))
      .catch((error) => {
        console.error(error);
      });
  };

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then(function (userCredential) {
      userCredential.user.updateEmail('newyou@domain.com');
    });
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateUser(newName) {
    return updateProfile(currentUser, {
      displayName: newName,
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log('Profile info updated');
        console.log(currentUser.displayName, currentUser.photoURL);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
  }

  function uploadProfilePic(file, user) {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'profilePic/' + user.uid);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
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
        setUploadProgress(false);
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
    return uploadTask
      .then(() => {
        setUploadProgress(false);
        return getDownloadURL(uploadTask.snapshot.ref);
      })
      .then(async (downloadUrl) => {
        console.log({ downloadUrl });
        const appUser = await upsertUser(pick(['uid'], user), { photoUrl: downloadUrl });
        setCurrentUser(appUser);
        return downloadUrl;
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
    uploadProfilePic,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUser,
    loginWithGoogle,
    uploadProgress,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
