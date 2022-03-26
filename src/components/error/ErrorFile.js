import React, {useState} from "react";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export const ErrorFile=({error, setError})=>{
    return (
      <Stack sx={{ width: "100%", mt:4}}
             spacing={2}
             justifyContent="center"
             alignItems="center"
      >
        <Alert variant="filled"
               severity="error"
               sx={{ width: { xs: "100%", sm: "100%", md:"800px"}}}
               onClose={() => {setError("")}}
        >
          Something went wrong! {error}
        </Alert>
      </Stack>
    );
}