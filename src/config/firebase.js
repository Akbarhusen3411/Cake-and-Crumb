import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase project configuration
// To set up: https://console.firebase.google.com
// 1. Create a project (or use existing)
// 2. Add a Web App
// 3. Copy the config values below
// 4. Enable Firestore Database (start in test mode, then add security rules)
// 5. Enable Storage (for review photos)
const firebaseConfig = {
  apiKey: 'AIzaSyCP9LGrADnVhV3TeLs3oegKwgn4WWmNXAA',
  authDomain: 'cake-and-crumb.firebaseapp.com',
  projectId: 'cake-and-crumb',
  storageBucket: 'cake-and-crumb.firebasestorage.app',
  messagingSenderId: '382369982078',
  appId: '1:382369982078:web:e676086330b58f0001da2f',
}

// Check if Firebase is configured
export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey !== '' && firebaseConfig.projectId !== ''

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
