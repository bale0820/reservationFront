import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// ✅ Firebase 콘솔 -> 프로젝트 설정 -> 웹앱 등록 -> Firebase SDK 설정값 복사
const firebaseConfig = {
  apiKey: "AIzaSyBrZEIV2CamNKLnR7rPC22h_HKaJf6x-PQ",
  authDomain: "medical-ai-app-1a1fe.firebaseapp.com",
  projectId: "medical-ai-app-1a1fe",
  storageBucket: "medical-ai-app-1a1fe.firebasestorage.app",
  messagingSenderId: "922374824872",
  appId: "1:922374824872:web:20529f3d3bb405a043f39d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);