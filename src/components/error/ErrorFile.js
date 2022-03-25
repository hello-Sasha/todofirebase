import React, {useState} from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export const ErrorFile=({error, setError})=>{
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="filled" severity="error" onClose={() => {setError('')}}>
          This is an error alert — check it out! {error.message}
        </Alert>
      </Stack>
    );

}