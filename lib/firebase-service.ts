import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential
  } from 'firebase/auth';
  import { auth } from './firebase-config';
import { FirebaseError } from 'firebase/app';

  export interface FirebaseUserResponse {
    user: User;
  }
  
  export const getCurrentUser = async () => {
    try {
      return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          unsubscribe();
          resolve(user ? { user } : null);
        });
      });
    } catch (error) {
      console.error("[error getting user] ==>", error);
      return null;
    }
  };
  
  export async function login(
    email: string, 
    password: string
  ): Promise<FirebaseUserResponse | undefined> {  
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    return { user: userCredential.user };
  }

  export async function logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("[error logging out] ==>", e);
      throw e;
    }
  }
  
  export async function register(
    name: string,
    email: string,
    password: string,
  ): Promise<FirebaseUserResponse | undefined> {
   
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      return { user: userCredential.user };
  }
