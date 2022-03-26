import React, {useEffect, useState} from 'react';
import {addNewTodos, deleteTodo, getTodos, updateTodo} from "../../api";

import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import "@fontsource/roboto/300.css";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {Input} from "../Input/Input";
import {Modal} from "../Modal/Modal";
import Snackbar from '@mui/material/Snackbar';
import {ErrorFile} from "../error/ErrorFile";



export  const TodoList = ()=>{

  const [todoList, setTodoList] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = useState('');
  const[todoToEdit, setTodoToEdit]=useState("");
  const[todoToEditTrans, setTodoToEditTrans]=useState("");
  const[alertMessage, setAlertMessage]=useState('');
  const[errorMessage, setErrorMessage]=useState("");
  const[snackBarMessage, setSnackBarMessage]=useState("");


  useEffect(()=>{
    (async()=>{
      const todoList = await getTodos();
      setTodoList(todoList);
    })();
  },[])

  const handleCloseSnackBar=()=>{
    setSnackBarMessage('');
  }
  const alertMessageNoTodo =
    <Alert severity="success" variant="outlined" sx={{mt:10}}>
      <AlertTitle>All Clear</AlertTitle>
      Look's like everything's organized in the right place. <strong>Press "Add" to add a new task</strong>
    </Alert>;

  useEffect(()=>{
    if (todoList.length===0){
      setAlertMessage(alertMessageNoTodo);
    } else {
      setAlertMessage('');
    }
  },[todoList]);

  const addNewTodo= async (e)=>{
    const dateToday= Date.now();
    const data = {
      "userId":1,
      "description":value,
      "active":true,
      "created": dateToday
    };
    await addNewTodos(data)
      .then((response)=>{
        setSnackBarMessage(`Todo created. Hooray!`);
        setTodoList(prevState=>[...prevState, {
          "userId":1,//UPDATE WITH LOGIN USER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          "id": response,
          "description":value,
          "active":true,
          "created": dateToday
          }
        ]);
      })
      .catch((e)=>{
        setErrorMessage(e.message)
      });

    setValue('');
    e.preventDefault();
  }
  const markTodoDone = (item) => {
      setTodoList((prevState) => [...prevState.map((todo)=> todo.id === item.id? {...item, active:false}: todo)]); //at local store
      deleteTodo(item.id)
        .then(()=>{
          setSnackBarMessage(`Todo set as Done and Deleted. Hooray!`)
        })
        .catch((e)=>{
          setErrorMessage(e.message)
        });
      const removeElement =()=>{
        setTodoList((prevState) => [...prevState.filter((todo)=> todo.id !== item.id)]);
      }
      setTimeout(removeElement, 2000);
  };

  const editTodoClick = (todo) => {
    setTodoToEdit(todo);
    setTodoToEditTrans(todo.description);
    setOpenModal(true);
  };
  const saveEditedTodo=(e)=>{
      updateTodo(todoToEdit.id, {...todoList.filter((todo)=>todo.id===todoToEdit.id), description: todoToEditTrans})//////
        .then(()=>{
          setSnackBarMessage(`Todo Edited. Hooray!`);
          setTodoList((prevState) => [...prevState.map((todo)=> todo.id === todoToEdit.id? {...todo, description: todoToEditTrans}: todo)]);
        })
        .catch((e)=>{
          setErrorMessage(e.message)
        });
      setTodoToEdit('');
      setTodoToEditTrans('');
      setOpenModal(false);
    e.preventDefault();
  }
  const showError =
    errorMessage!==""?
      <ErrorFile error={errorMessage} setError={setErrorMessage}/>
      : "";

  return (
    <>
      <Modal
        component={
        <Input
          value={todoToEditTrans}
          setValue={setTodoToEditTrans}
          submit={(e)=>{saveEditedTodo(e)}}
          button={"Save"}
         />
        }
        open={openModal}
        setOpen={setOpenModal}/>
      <Input value={value} setValue={setValue} submit={addNewTodo} button={"Add"}/>
        {showError}
        {alertMessage}
      <List sx={{ width: "100%",  bgcolor: "background.paper" }}>
        {todoList.map((item) => {
          return (
            <ListItem
              key={item.id} // change id key!
              secondaryAction={
                  <IconButton edge="end" onClick={()=>{editTodoClick(item)}}>
                    <EditIcon color="success" />
                  </IconButton>
              }
              sx={{overflow: "hidden"}}
            >
              <ListItemIcon>
                <Checkbox
                          edge="start"
                          color="success"
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                          onClick={()=>{markTodoDone(item)}}
                        />
              </ListItemIcon>
              <TextField
                value={item.description}
                variant="standard"
                color="success"
                focused
                fullWidth
                multiline
                maxRows={5}
                InputProps={{
                  disableUnderline: true
                }}
                style={{ textDecoration : item.active===false? 'line-through' : 'none' }}
              />
            </ListItem>
          );
        })}
      </List>
      <Snackbar
        severity="success"
        open={snackBarMessage!==""? true: false}
        autoHideDuration={6000}
      >
        <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>{snackBarMessage}</Alert>
      </Snackbar>
    </>
  )
}