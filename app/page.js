"use client";

import { useState } from "react"; // No need for useEffect here if not used
import Link from "next/link";
import { useUserAuth } from "./auth-context"; // Assuming this is the correct path

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // TODO: Implement handleSignIn and handleSignOut functions using gitHubSignIn and firebaseSignOut from useUserAuth
  const handleSignIn = async () => {
    try {
      await gitHubSignIn(); // Assuming gitHubSignIn handles GitHub sign-in
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(); // Assuming firebaseSignOut handles Firebase sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container mx-0  p-4 ">
      {user ? (
        <>
          <p className="font-bold text-4xl">Welcome, {user.displayName}</p>
          {/* TODO: Render a button that links to the weather page. Use the Next.js Link component. */}
          <Link href="/weather">
            <span className="block bg-blue-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded  text-2xl mt-5">
              Go to Weather
            </span>
          </Link>
          {/* TODO: Render a Sign Out button that calls handleSignOut when clicked */}
          <button onClick={handleSignOut} className="block bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded text-2xl mt-5">
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p>Please sign in to access the weather information.</p>
          {/* TODO: Render a Sign In button that calls handleSignIn when clicked */}
          <button onClick={handleSignIn} className="block my-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign In with GitHub
          </button>
        </>
      )}
    </div>
  );
}
