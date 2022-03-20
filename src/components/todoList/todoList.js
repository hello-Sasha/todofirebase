import React, { useState} from 'react';
import {Input} from "../Input/Input";
import {Modal} from "../Modal/Modal";


import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import "@fontsource/roboto/300.css";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";




export  const TodoList = ()=>{
  const [todoList, setTodoList] = useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = useState('');


  const[todoToEdit, setTodoToEdit]=useState("");
   const[todoToEditTrans, setTodoToEditTrans]=useState("");

  const addNewTodo=(e)=>{
      setTodoList(prevState=>[...prevState, {
        "userId":4,
        "todoId":Math.floor(Math.random()*100)+1, // change it!
        "description":value,
        "status":"active"
      }
      ]);
      setValue('');
    e.preventDefault();

  }
  const markTodoDone = (item) => {
      //mark as done
       setTodoList((prevState) => [...prevState.map((todo)=> todo.todoId === item.todoId? {...item, status:"done"}: todo)]);
      //remove in 2 sec
      const removeElement =()=>{
        setTodoList((prevState) => [...prevState.filter((todo)=> todo.todoId !== item.todoId)]);
      }
      setTimeout(removeElement, 2000);
  };

  const editTodoClick = (todo) => {
    setTodoToEdit(todo);
    setTodoToEditTrans(todo.description);
    setOpenModal(true);
  };
  const saveEditedTodo=(e)=>{
      setTodoList((prevState) => [...prevState.map((todo)=> todo.todoId === todoToEdit.todoId? {...todo, description: todoToEditTrans}: todo)]);
      setTodoToEdit('');
      setTodoToEditTrans('');
      setOpenModal(false);
    e.preventDefault();
  }
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
      <p>TodoList Page</p>

      <Input value={value} setValue={setValue} submit={addNewTodo} button={"Add"}/>
      <List sx={{ width: "100%",  bgcolor: "background.paper" }}>
        {todoList.map((item) => {
          return (
            <ListItem
              key={item.todoId+item.description} // change id key!
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
              />
            </ListItem>
          );
        })}
      </List>
    </>
  )
}