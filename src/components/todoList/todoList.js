import React, { useState} from 'react';
import {Input} from "../Input/Input";


import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import "@fontsource/roboto/300.css";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";




export  const TodoList = ()=>{
  const [todoList, setTodoList] = useState([]);
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const[todoToEdit, setTodoToEdit]=useState("");
   const[todoToEditTrans, setTodoToEditTrans]=useState("");

  const addNewTodo=(e)=>{
    if (value===""){
      setErrorMessage("todo can't be empty");
    }else{
      setErrorMessage("");
      setTodoList(prevState=>[...prevState, {
        "userId":4,
        "todoId":Math.floor(Math.random()*100)+1, // change it!
        "description":value,
        "status":"active"
      }
      ]);
      setValue('');
    }
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
  };
  const saveEditedTodo=(e)=>{
    setTodoList((prevState) => [...prevState.map((todo)=> todo.todoId === todoToEdit.todoId? {...todo, description: todoToEditTrans}: todo)]);
    setTodoToEdit('');
    setTodoToEditTrans('');
    e.preventDefault();
  }
  return (
    <>
      <p>TodoList Page</p>
      <p>{errorMessage}</p>
      <Input value={value} setValue={setValue} submit={addNewTodo} button={"Add"}/>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {todoList.map((item) => {
          const displayTodo = item.todoId ===todoToEdit.todoId?
             <Input value={todoToEditTrans} setValue={setTodoToEditTrans} submit={(e)=>{saveEditedTodo(e)}} button={"Save"} />:
            `${item.description}-${item.status}-${item.todoId}`;
          const displayCheckbox = item.todoId ===todoToEdit.todoId? '':
                    <Checkbox
                    edge="start"
                    color="success"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                    onClick={()=>{markTodoDone(item)}}
                  />;
          const displayEditIcon = item.todoId ===todoToEdit.todoId? '': <EditIcon color="success" />;

          return (
            <ListItem
              key={item.todoId+item.description} // change id key!
              secondaryAction={
                  <IconButton edge="end" onClick={()=>{editTodoClick(item)}}>
                    {displayEditIcon}
                  </IconButton>
              }
            >
              <ListItemIcon>
                {displayCheckbox}
              </ListItemIcon>
                <Typography
                  sx={{
                    textDecoration:
                      item.status === "active" ? "none" : "line-through"
                  }}
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                >
                  {displayTodo}
                </Typography>
            </ListItem>
          );
        })}
      </List>
    </>
  )
}