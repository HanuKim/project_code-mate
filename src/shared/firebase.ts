import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { CONFIG_KEY } from './config';
import { getStorage } from 'firebase/storage';

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = CONFIG_KEY;
// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbService = getFirestore(app);
export const storage = getStorage(app);

export function signup(email: any, password: any) {
  console.log(email, password);
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email: any, password: any) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Storage
export async function upload(file: any, currentUser: any, setLoading: any) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
  alert('Uploaded file!');
}
