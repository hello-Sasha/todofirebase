import React from 'react';

import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#4caf50',
      contrastText: '#fff',
    },
  },
});

export const Modal= ({component, open, setOpen})=> {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <ThemeProvider theme={darkTheme}>
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1,  }} variant="h6" component="div">
                Edit todo
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        <Box sx={{margin:"20px"}}>
          {component}
        </Box>
      </Dialog>
    </div>
  );
}



