import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const uploadImage = async (file: File, directory: string = 'images') => {
  const storage = getStorage();
  const fileName = Date.now();
  const storageRef = ref(storage, `${directory}/${fileName}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};
