import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDOkC-FMpYNyDb_TYPiZ-m_EoifRTzVsjA',
  authDomain: 'kohineko-7d678.firebaseapp.com',
  projectId: 'kohineko-7d678',
  storageBucket: 'kohineko-7d678.appspot.com',
  messagingSenderId: '597681719456',
  appId: '1:597681719456:web:3c099019e2888fb36461c5',
  measurementId: 'G-X221KMS0F4',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (file: File, directory: string = 'images') => {
  const fileName = Date.now();
  const storageRef = ref(storage, `${directory}/${fileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
