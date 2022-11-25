import {initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyA46Jg-XOVDEkBAJcF9Q9IVUtxLEJ4owU8",
    authDomain: "pwa-10a-evelyn.firebaseapp.com",
    projectId: "pwa-10a-evelyn",
    storageBucket: "pwa-10a-evelyn.appspot.com",
    messagingSenderId: "575285743586",
    appId: "1:575285743586:web:551dfaf34f539cf6eeb3bb"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export {
    app
  }