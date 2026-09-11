import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const env = import.meta.env;

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyASVUkhHH1sjSY8GEGrnQy51zzpu6qkG_Q",
  authDomain: "careflow-hospital-54337.firebaseapp.com",
  projectId: "careflow-hospital-54337",
  storageBucket: "careflow-hospital-54337.firebasestorage.app",
  messagingSenderId: "345221471191",
  appId: "1:345221471191:web:2fb3603562b1a1b7c00992",
  measurementId: "G-8SM4F69B5H"
};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || env.VITE_API_KEY || env.VITE_FIREBASE_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || env.VITE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || env.VITE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || env.VITE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.VITE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || env.VITE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || env.VITE_MEASUREMENT_ID || DEFAULT_FIREBASE_CONFIG.measurementId,
};

export const hasFirebaseConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'MY_API_KEY' &&
  !firebaseConfig.apiKey.startsWith('YOUR_')
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

if (hasFirebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    firestore = getFirestore(app);
    console.info(`[CareFlow Firebase] Connected to Cloud Firestore project: ${firebaseConfig.projectId}`);
  } catch (err) {
    console.warn('[CareFlow Firebase] Initialization failed, using local storage fallback.', err);
    app = null;
    auth = null;
    firestore = null;
  }
} else {
  console.info('[CareFlow Firebase] Running in Local Persistent Storage mode. (Set VITE_FIREBASE_* in Netlify to connect to Cloud Firestore)');
}

export { app, auth, firestore, firebaseConfig };
