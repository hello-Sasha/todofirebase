import React, {useState} from "react";
import {useAuth} from "../../features/AuthContextProvider";
import {useNavigate} from "react-router-dom";;

import Box from "@mui/material/Box";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import {ErrorFile} from "../error/ErrorFile";




export const Header=()=>{
  const [errorMessage, setErrorMessage]=useState("");
  let navigate=useNavigate();
  const isAuthenticate = useAuth().isAuthenticate;
  const logOut = useAuth().logOut;
  const logOutClick=()=>{
    logOut()
      .then(()=>{
        navigate('/login');
      })
      .catch((e)=>{
        setErrorMessage(e.message);
      });
  }

  const showLogoutButton = isAuthenticate?
        <Grid item xs={1}>
          <Tooltip title="Logout">
            <LogoutIcon sx={{ fontSize: 40,  color: "#4caf50" }} onClick={logOutClick}/>
          </Tooltip>
        </Grid>
        :"";

  const showError =
    errorMessage!==""?
      <ErrorFile error={errorMessage} setError={setErrorMessage}/>
      : "";

  return (
    <>
    <Grid
      container
      spacing={0}
      direction={{xs:'row', lg:'row'}}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={10} onClick={()=>navigate('/')}>
        <Box
          component="div"
        >
          <Grid
            container
            spacing={0}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item >
              <DoneAllIcon
                sx={{ fontSize: 70,  color: "#4caf50" }}
              />
            </Grid>
            <Grid item >
              <Typography
                variant="h4"
                component="div"
                color="#1b5e20"
              >
                <b>TODO APP</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {showLogoutButton}
    </Grid>
      {showError}
    </>

  )
}