// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  projectId: "abs-build",
  appId: "1:254937340843:web:49bfffc3097a5d1547d0ee",
  storageBucket: "abs-build.appspot.com",
  apiKey: "AIzaSyCMfneSxUnvaIRKZqdIY5m3wksLGjRIRac",
  authDomain: "abs-build.firebaseapp.com",
  messagingSenderId: "254937340843",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Types
export interface NewsArticle {
  id?: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  hint: string;
  featured: boolean;
}

export interface Project {
    id?: string;
    title: string;
    image: string;
    hint: string;
}

// Storage Functions
export const uploadImage = async (file: File) => {
  const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export const deleteImage = async (imageUrl: string) => {
  if (!imageUrl.includes('firebasestorage.googleapis.com')) return;
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error: any) {
    if (error.code !== 'storage/object-not-found') {
        console.error("Error deleting image:", error);
    }
  }
};


// Firestore collections
const newsCollection = collection(db, "news");
const projectsCollection = collection(db, "projects");

// News CRUD
export const addNews = (news: Omit<NewsArticle, 'id'>) => addDoc(newsCollection, news);
export const getNews = async (): Promise<NewsArticle[]> => {
  const q = query(newsCollection, orderBy("date", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
};
export const updateNews = (id: string, news: Partial<NewsArticle>) => updateDoc(doc(db, "news", id), news);
export const deleteNews = (id: string) => deleteDoc(doc(db, "news", id));

// Projects CRUD
export const addProject = (project: Omit<Project, 'id'>) => addDoc(projectsCollection, project);
export const getProjects = async (): Promise<Project[]> => {
    const snapshot = await getDocs(projectsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};
export const updateProject = (id: string, project: Partial<Project>) => updateDoc(doc(db, "projects", id), project);
export const deleteProject = (id: string) => deleteDoc(doc(db, "projects", id));


export { app, auth, db, storage };