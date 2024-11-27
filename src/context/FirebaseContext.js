// src/context/FirebaseContext.js

import React, { createContext, useContext } from 'react';
import { firebase, firestore, auth, storage } from './Firebase';

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const firebaseContextValue = {
        firebase,
        firestore,
        auth,
        storage,
    };

    return (
        <FirebaseContext.Provider value={firebaseContextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => useContext(FirebaseContext);