"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import {
  auth,
  signInWithGoogle,
  registerWithEmail,
  loginWithEmail,
  logoutUser,
  subscribeToAuth,
} from "@/lib/firebase";
import { syncUserWithMongoDB, MongoUser } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  mongoUser: MongoUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User>;
  registerWithEmail: (email: string, pass: string, name?: string) => Promise<User>;
  loginWithEmail: (email: string, pass: string) => Promise<User>;
  logout: () => Promise<void>;
  syncWithDatabase: () => Promise<MongoUser | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mongoUser, setMongoUser] = useState<MongoUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync user with MongoDB Atlas whenever auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const dbUser = await syncUserWithMongoDB(currentUser);
          if (dbUser) setMongoUser(dbUser);
        } catch (err) {
          console.warn("Background MongoDB sync error:", err);
        }
      } else {
        setMongoUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    const u = await signInWithGoogle();
    setUser(u);
    try {
      const dbUser = await syncUserWithMongoDB(u);
      if (dbUser) setMongoUser(dbUser);
    } catch (err) {
      console.warn("MongoDB sync on Google sign in error:", err);
    }
    return u;
  };

  const handleRegister = async (email: string, pass: string, name?: string) => {
    const u = await registerWithEmail(email, pass, name);
    setUser(u);
    try {
      const dbUser = await syncUserWithMongoDB(u);
      if (dbUser) setMongoUser(dbUser);
    } catch (err) {
      console.warn("MongoDB sync on register error:", err);
    }
    return u;
  };

  const handleLogin = async (email: string, pass: string) => {
    const u = await loginWithEmail(email, pass);
    setUser(u);
    try {
      const dbUser = await syncUserWithMongoDB(u);
      if (dbUser) setMongoUser(dbUser);
    } catch (err) {
      console.warn("MongoDB sync on login error:", err);
    }
    return u;
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setMongoUser(null);
  };

  const syncWithDatabase = async () => {
    if (!user) return null;
    const dbUser = await syncUserWithMongoDB(user);
    if (dbUser) setMongoUser(dbUser);
    return dbUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        mongoUser,
        loading,
        signInWithGoogle: handleGoogleSignIn,
        registerWithEmail: handleRegister,
        loginWithEmail: handleLogin,
        logout: handleLogout,
        syncWithDatabase,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
