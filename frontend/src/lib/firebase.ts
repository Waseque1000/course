// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyCdxjiuGFQVkLvmo1baT2BPkcXEIpbcI-Y",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "bloggent-8239f.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "bloggent-8239f",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "bloggent-8239f.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "922501490613",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:922501490613:web:c3c2762473bd7e802d1bfc",
};

// Initialize Firebase (singleton pattern for Next.js SSR/client)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider prompts
googleProvider.setCustomParameters({
  prompt: "select_account",
});

/**
 * Sign In / Register with Google via Firebase Popup
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export const DEFAULT_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDCG9PFr1Lc9dzImpHZoXXOyI1aOrV7Kr1jl7zJEzGloeb3JQX7CFBwEc_W-A99A3kgHtJmkNj2InfDx1LabTfcZlx0IQYfbFTcPG9epKTqHLGPva7cRS-6zaiKAOj2nklt1XAo9MFBIRjHly-W91VYLu5g4Ue79mizZl1FsF3eG6EsTb0ZjsXn7K-aMtsd7DkjFzMvgvjnZZhcNT3HeRSs-q2RJ_-NywYtdThMuaDW";

/**
 * Register a new user with Email, Password and Display Name
 */
export async function registerWithEmail(
  email: string,
  pass: string,
  displayName?: string
): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  if (userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: displayName || "Sarah Chen",
      photoURL: DEFAULT_AVATAR,
    });
  }
  return userCredential.user;
}

/**
 * Sign In existing user with Email and Password
 */
export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
}

/**
 * Sign Out current user
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribe to Auth State Changes
 */
export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

