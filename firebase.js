import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAqft9Vn-Q49AhNFW8GwX45qFIPHyo_efs",
  authDomain: "docs-clone-53c81.firebaseapp.com",
  projectId: "docs-clone-53c81",
  storageBucket: "docs-clone-53c81.appspot.com",
  messagingSenderId: "985072915231",
  appId: "1:985072915231:web:e437fd1f4e00b003dfd62a",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = app.firestore();

  export {db};