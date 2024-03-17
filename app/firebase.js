// Importing necessary functions from Firebase SDK
// 'initializeApp' is used to initialize the Firebase app with a given configuration.
import { initializeApp } from "firebase/app";
// Import 'getAuth' function for Firebase authentication.
// This is used to initialize the authentication service.
import { getAuth } from "firebase/auth";

// Firebase configuration object containing keys and identifiers for your app.
// This includes API key, auth domain, project ID, storage bucket, messaging sender ID, and app ID.
// These values are stored in environment variables to keep them secure and not hard-coded into the source code.
// process.env is used to access these environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyBAxvV5RYoc_CRhf8OACHIsQv3KflyPVqc",
  authDomain: "assignment-5806b.firebaseapp.com",
  projectId: "assignment-5806b",
  storageBucket: "assignment-5806b.appspot.com",
  messagingSenderId: "935272199690",
  appId: "1:935272199690:web:bcd5b1f6f94f79024c91f3",
  measurementId: "G-676YFPWD8D"
};

// Initializing the Firebase application with the configuration object.
// The 'app' object represents your Firebase application and is used in subsequent Firebase service initializations.
const app = initializeApp(firebaseConfig);

// Initializing Firebase authentication service and exporting it.
// 'auth' is an instance of Firebase Auth service, used for handling user authentication.
export const auth = getAuth(app);
