import React, {useState} from 'react';
import TextField from "@mui/material/TextField";


export const InputField=({value, setValue, label})=>{
  const onInputChange=(e)=>{
    setValue(e.target.value);
    e.preventDefault()
  }

  const type = label==="password"? "password":"text";
  return(
    <>
      <TextField
        id="outlined-required"
        label={label}
        value={value}
        onChange={onInputChange}
        type={type}
        fullWidth={true}
      />
    </>
  )
}