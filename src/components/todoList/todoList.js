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



export  const TodoList = ()=>{

  const [todoList, setTodoList] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = useState('');
  const[todoToEdit, setTodoToEdit]=useState("");
  const[todoToEditTrans, setTodoToEditTrans]=useState("");
  const[alertMessage, setAlertMessage]=useState('');
  const[snackBarMessage, setSnackBarMessage]=useState("");
  const[todoID, setTodoID]=useState("");

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
    const data = {
      "userId":1,
      "description":value,
      "active":true
    };
    await addNewTodos(data)
      .then((response)=>{
        setSnackBarMessage(`Todo created. Hooray!`);
        setTodoList(prevState=>[...prevState, {
          "userId":1,//UPDATE WITH LOGIN USER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          "id": response,
          "description":value,
          "active":true
          }
        ]);
      })
      .catch((e)=>{
        setSnackBarMessage(`Something went wrong: ${e.message}`)
      });

    setValue('');
    e.preventDefault();
  }
  const markTodoDone = (item) => {
      //mark as done
      setTodoList((prevState) => [...prevState.map((todo)=> todo.id === item.id? {...item, active:false}: todo)]); //at local store
      // updateTodo(item.id, {...todoList.filter((todo)=>todo.id===item.id), active: false})////// at the db
      //   .then(()=>{
      //     setSnackBarMessage(`Todo set as Done. Hooray!`)
      //   })
      //   .catch((e)=>{
      //     setSnackBarMessage(`Something went wrong: ${e.message}`)
      //   });
      deleteTodo(item.id)
        .then(()=>{
          setSnackBarMessage(`Todo set as Done and Deleted. Hooray!`)
        })
        .catch((e)=>{
          setSnackBarMessage(`Something went wrong: ${e.message}`)
        });
      //remove in 2 sec
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
      setTodoList((prevState) => [...prevState.map((todo)=> todo.id === todoToEdit.id? {...todo, description: todoToEditTrans}: todo)]);
      updateTodo(todoToEdit.id, {...todoList.filter((todo)=>todo.id===todoToEdit.id), description: todoToEditTrans})//////
        .then(()=>{
          setSnackBarMessage(`Todo Edited. Hooray!`)
        })
        .catch((e)=>{
          setSnackBarMessage(`Something went wrong: ${e.message}`)
        });
      setTodoToEdit('');
      setTodoToEditTrans('');
      setOpenModal(false);
    e.preventDefault();
  }

  return (
    <>
      <p>todoID:{todoID}</p>
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
        open={snackBarMessage!==""? true: false}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={snackBarMessage}
      />
    </>
  )
}