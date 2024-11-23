import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  getCurrentUser,
  login,
  logout,
  register,
} from "@/lib/firebase-service";
import { auth } from "@/lib/firebase-config";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<User | undefined>;

  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<User | undefined>;

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
      console.error("[handleSignUp error] ==>", error);
      return undefined;
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
