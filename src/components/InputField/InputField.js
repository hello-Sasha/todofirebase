import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";


export const InputField=({value, setValue, label, errorMessage=null})=>{


  const onInputChange=(e)=>{
    setValue(e.target.value);
    e.preventDefault()
  }

  const errorFlag=errorMessage? true: false;
  const type = label.includes("password")? "password":"text";
  return(
    <>
      <TextField
        id={value}
        label={label}
        value={value}
        onChange={onInputChange}
        type={type}
        fullWidth={true}
        error={errorFlag}
        helperText={errorMessage}
      />

    </>
  )
}