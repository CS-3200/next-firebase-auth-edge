import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { clientConfig } from "././config/client-config";

const app = initializeApp(clientConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
