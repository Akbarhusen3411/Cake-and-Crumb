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
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

// Check if Firebase is configured
export const isFirebaseConfigured = () =>
  firebaseConfig.apiKey !== '' && firebaseConfig.projectId !== ''

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
