import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormHelperText from '@mui/material/FormHelperText';




export const Input=({value, setValue, submit, button})=>{
  const [errorMessage, setErrorMessage ]= useState("");
  const [errorFlag, setErrorFlag ]= useState(false);

  const onChangeInput=(e)=>{
    setValue(e.target.value)
    e.preventDefault();
  }

  const submitFunction=(e)=>{
    if (value===""){
      setErrorFlag(true);
      setErrorMessage("Todo can not be empty");
      //setTimeout(()=>{setErrorFlag(false)},1000)
    } else {
      submit(e);
      setErrorFlag(false);
      setErrorMessage('')
    }
    e.preventDefault();
  };
  const handleKeyDown = event => { // to submit on enter overrides multiline
    if (event.which === 13) {
      submitFunction(event);
      event.preventDefault();
    }
  };

  return (
    <>
      <form onSubmit={submitFunction}>
        <FormControl fullWidth  error={errorFlag} variant="standard">
          <Grid container spacing={2}
                sx={{ flexDirection: { xs: "column", sm: "row"},
                  alignItems: {xs:"", sm: "center"},
                }}
          >
            <Grid item xs={12} sm={9}>
              <TextField
                value={value}
                onChange={onChangeInput}
                id="input-textarea"
                placeholder="Add new todo"
                variant="standard"
                color="success"
                focused
                fullWidth
                inputProps={{ autoFocus: true }}
                multiline
                maxRows={8}
                onKeyDown={handleKeyDown}
              />
             <FormHelperText>{errorMessage}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button variant="contained" color="success" fullWidth  type="submit">
                {button}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </>

  )
}