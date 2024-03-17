"use client";
import React, { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GithubAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

// Create a new React context for authentication; it's a construct that allows us to pass data deeply throughout the component tree.
const AuthContext = createContext();

// Define a provider component for the authentication context.
// It uses React's children prop to pass down components.
export const AuthContextProvider = ({ children }) => {
  // State hook for keeping track of the user's authentication status.
  const [user, setUser] = useState(null);

  // Function to sign in using GitHub with Firebase.
  // It creates a new instance of the GithubAuthProvider and then uses Firebase's signInWithPopup method.
  const gitHubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  // Function to sign out using Firebase's signOut method.
  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Effect hook to monitor the authentication state change.
  // It sets the user state based on Firebase's current user.
  // Cleans up by unsubscribing from the auth state listener when the component unmounts or user changes.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener.
  }, []);

  // The provider component passes the user, signIn, and signOut functions down to any descendants in the component tree.
  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to allow easy consumption of the authentication context values (user, signIn, signOut) in other components.
export const useUserAuth = () => {
  return useContext(AuthContext);
};
