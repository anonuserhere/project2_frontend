const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_AUTH_API_KEY,
  authDomain: import.meta.env.REACT_APP_FIREBASE_AUTH_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_FIREBASE_AUTH_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FIREBASE_AUTH_MESSAGE_SENDER_ID,
  appId: import.meta.env.REACT_APP_FIREBASE_AUTH_APP_ID,
};

export default firebaseConfig;
