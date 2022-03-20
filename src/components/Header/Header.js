import React, {useState} from "react";
import Box from "@mui/material/Box";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';


export const Header=({isLoggedIn=true})=>{

  const showLogoutButton = isLoggedIn?
        <Grid item xs={1}>
          <Tooltip title="Logout">
            <LogoutIcon sx={{ fontSize: 40,  color: "#4caf50" }}/>
          </Tooltip>
      </Grid>:"";
  return (
    <Grid
      container
      spacing={0}
      direction={{xs:'row', lg:'row'}}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={10}>
        <Box
          component="div"
         // minWidth="300px"
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


  )
}