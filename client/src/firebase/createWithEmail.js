import { app } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth(app);

const createWithEmail = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      return userCredential;
    })
    .catch((error) => {
      console.log(error);
    });
};

const googleProvider = new GoogleAuthProvider();
const signupWithGoogle = async () => {
  return signInWithPopup(auth, googleProvider);
};

export { signupWithGoogle, createWithEmail };
