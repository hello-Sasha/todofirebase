import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

export const initializeAPI =()=>{
  initializeApp({
    apiKey: "AIzaSyBZ0ipYBtm6YgrdKGuxK3t5IFJE93PxDBM",
    authDomain: "todolist-9e0fe.firebaseapp.com",
    projectId: "todolist-9e0fe",
    storageBucket: "todolist-9e0fe.appspot.com",
    messagingSenderId: "146029757670",
    appId: "1:146029757670:web:07dcb6d4e599c385a3a727"
  });
  getFirestore();
};
const todoListCollection ='todolist';


export const getTodos= async()=>{
  const db=getFirestore();
  const todoList=[];
  try{
    const querySnapshot = await getDocs(collection(db, todoListCollection));
    querySnapshot.forEach((doc) => { //preudo array
      todoList.push({
        id: doc.id,
        ...doc.data()
      });
    });
  }catch(e){
    return Promise.reject(e);
  }
  return todoList;
};

export const addNewTodos= async(data)=>{
  const db=getFirestore();
  try{
   const docRef= await addDoc(collection(db, todoListCollection), data);
   return docRef.id;
  } catch(e){
    return Promise.reject(e);
  }
};

export const updateTodo= async(id, data)=>{
  const db=getFirestore();
  try {
    const todo = doc(db, todoListCollection, id);
    await updateDoc(todo, data);
  } catch(e){
    return Promise.reject(e);
  }
};

export const deleteTodo= async(id)=>{
  const db=getFirestore();
  try {
    await deleteDoc(doc(db, todoListCollection, id));
  } catch(e){
    return Promise.reject(e);
  }
};
