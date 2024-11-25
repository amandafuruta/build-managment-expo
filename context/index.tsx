import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@/lib/firebase-service";
import { auth } from "@/lib/firebase-config";
import { FirebaseError } from "firebase/app";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<User | string | undefined>;

  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<User | string | undefined>;

  signOut: () => void;

  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useSession(): AuthContextType {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      return response?.user;
    } catch (error) {
      if (error instanceof FirebaseError){
        if (error.code === "auth/user-not-found"){
          return "User not found";
        } else if (error.code === "auth/invalid-email"){
          return "Invalid data";
        } else if (error.code === "auth/wrong-password"){
          return "Wrong password";
        }
      }
      console.error("[handleSignIn error] ==>", error);
      return undefined;
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await register( name, email, password);
      return response?.user;
    } catch (error) {
      if (error instanceof FirebaseError){
        if (error.code === "auth/email-already-in-use") {
          return "This email is already in use.";
        } else if (error.code === "auth/invalid-email") {
          return "Invalid email address.";
        } else if (error.code === "auth/weak-password") {
          return "Weak password.";
        } else {
          return "An error occurred. Please try again.";
        }
      }
      else{
        console.error("[handleSignUp error] ==>", error);
        return undefined;
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("[handleSignOut error] ==>", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        user,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
