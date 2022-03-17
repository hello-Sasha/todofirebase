import React, {FC} from "react";
import {Outlet} from 'react-router-dom';
import {Header} from "../Header/Header";
import {makeStyles} from "@mui/styles";
import {red} from "@mui/material/colors";

const useStyles =makeStyles({
  root:{
    height: '100%',
    overflow: 'hidden',
    width: '100%',
    padding:"40px"
  },
  container:{
   // margin: "20px",
    background: red[100],


  }
})


export const Layout=()=>{
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Header/>
      </div>

      <Outlet/>
    </div>
  )
}