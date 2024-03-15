import {getApp,getApps, initializeApp} from "firebase/app"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyB8SLTYDmGY6olvQ5dQ0Pc9Ct420PNpaAQ",
    authDomain: "cipher-rep.firebaseapp.com",
    projectId: "cipher-rep",
    storageBucket: "cipher-rep.appspot.com",
    messagingSenderId: "1058049020237",
    appId: "1:1058049020237:web:f4f422969f4985e684a704",
    measurementId: "G-QRVJDDNEEM"
  };

  const app = getApps.length >0?getApp() : initializeApp(firebaseConfig);
  const storage = getStorage(app);

export { app, storage };