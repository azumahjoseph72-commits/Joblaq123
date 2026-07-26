
// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMmm7FuuJjr902Im7lCwCoVkbzmo61adU",
  authDomain: "linkjoe-99100.firebaseapp.com",
  projectId: "linkjoe-99100",
  storageBucket: "linkjoe-99100.firebasestorage.app",
  messagingSenderId: "106619627679",
  appId: "1:106619627679:web:c83ac5ad29a037a4b41aaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get HTML elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const message = document.getElementById("message");

// Create account
signup.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      message.style.color = "green";
      message.textContent = "Account created successfully!";
    })
    .catch((error) => {
      message.style.color = "red";
      message.textContent = error.message;
    });
});

// Sign in
login.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      message.style.color = "green";
      message.textContent = "Login successful!";
      window.location.href = "home.html";
    })
    .catch((error) => {
      message.style.color = "red";
      message.textContent = error.message;
    });
});
