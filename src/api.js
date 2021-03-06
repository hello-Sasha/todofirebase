import {initializeApp} from "firebase/app";
import {collection, getDocs, getFirestore, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import {useAuth} from "./features/AuthContextProvider";

export const initializeAPI =()=>{
  const firebaseApp =initializeApp({
    apiKey: "AIzaSyBZ0ipYBtm6YgrdKGuxK3t5IFJE93PxDBM",
    authDomain: "todolist-9e0fe.firebaseapp.com",
    projectId: "todolist-9e0fe",
    storageBucket: "todolist-9e0fe.appspot.com",
    messagingSenderId: "146029757670",
    appId: "1:146029757670:web:07dcb6d4e599c385a3a727"
  });

  getAuth(firebaseApp);
  getFirestore(firebaseApp);
  getStorage(firebaseApp);

  return firebaseApp;
};
// const todoListCollection ='todolist';
const usersCollection ='users';




export const getTodos= async()=>{
  const user=getAuth();
  const db=getFirestore();
  const todoList=[];
  try{
    const querySnapshot = await getDocs(collection(db, usersCollection,`${user.currentUser.uid}/todos` ));//change for uid!!!!!!
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

// export const getTodos= async()=>{
//   const db=getFirestore();
//   const todoList=[];
//   try{
//     const querySnapshot = await getDocs(collection(db, todoListCollection));
//     querySnapshot.forEach((doc) => { //preudo array
//       todoList.push({
//         id: doc.id,
//         ...doc.data()
//       });
//     });
//   }catch(e){
//     return Promise.reject(e);
//   }
//   return todoList;
// };

export const addNewTodos= async(data)=>{
  const db=getFirestore();
  const user=getAuth();
  try{
   //const docRef= await addDoc(collection(db, todoListCollection), data);
    const docRef= await addDoc(collection(db, usersCollection, `${user.currentUser.uid}/todos`), data);
   return docRef.id;
  } catch(e){
    return Promise.reject(e);
  }
};

export const updateTodo= async(id, data)=>{
  const user=getAuth();
  const db=getFirestore();
  try {
    const todo = doc(db, usersCollection,`${user.currentUser.uid}/todos`, id);
    await updateDoc(todo, data);
  } catch(e){
    return Promise.reject(e);
  }
};

export const deleteTodo= async(id)=>{
  const user=getAuth();
  const db=getFirestore();
  try {
    await deleteDoc(doc(db, usersCollection,`${user.currentUser.uid}/todos`, id));
  } catch(e){
    return Promise.reject(e);
  }
};
