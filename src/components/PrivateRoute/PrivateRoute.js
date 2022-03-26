import {Navigate} from "react-router-dom";
import React, {useEffect} from "react";
import {useAuth} from "../../features/AuthContextProvider";
import {Box, CircularProgress} from "@mui/material";


export const PrivateRoute = ({children})=>{
  const isAuthenticate = useAuth().isAuthenticate;

  return (
    isAuthenticate ===null?
      <Box
        sx={{display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <CircularProgress color="success"
                          size={150}
        />
      </Box>:
      isAuthenticate ===true? children:
        <Navigate to="/login" />
  )
};