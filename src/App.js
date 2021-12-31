import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Hero from "./hero";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ThemeProvider } from '@mui/material/styles';
import Theme from "./theme"

import firebaseApp from "./firebaseApp";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };
  const clearError = () => {
    setError("");
  };
  const handleLogin = () => {
    clearError();
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setError(err.message);
          break;
        case "auth/wrong-password":
          setError(err.message);
          break;
      }
    });
  };
  const handleSignUp = () => {
    clearError();
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/email-already-in-use":
          setError(err.message);
          break;
        case "auth/weak-password":
          setError(err.message);
          break;
      }
    });
  };
  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    auth.signOut();
  };

  const authListner = () => {
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
      // Check for user status
      if (user) {
        clearInputs();
        setUser(user);  
        console.log(user)
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authListner();
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
      {!user ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignUp={handleSignUp}
          setHasAccount={setHasAccount}
          error={error}
          setError={setError}
          hasAccount={hasAccount}
        ></Login>
      ) : (
        <Hero handleLogout={handleLogout} setHasAccount={setHasAccount}></Hero>
      )}
      </ThemeProvider>
    </div>
  );
}

export default App;
