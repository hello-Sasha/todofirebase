import React, {useState} from 'react';
import {InputField} from "../components/InputField/InputField";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {useAuth} from "../features/AuthContextProvider";
import { useNavigate} from "react-router-dom";
import {ErrorFile} from "../components/error/ErrorFile";



export const Login=()=>{
  const navigate=useNavigate();
  const {loginWithEmailAndPassword}=useAuth();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');

  const onSubmit=(e)=>{
    loginWithEmailAndPassword(email, password)
      .then(()=>{
         navigate('/');
      })
      .catch((e)=>{
        setError(e.message);
      })
    e.preventDefault();
  }
  return (
    <>
      <ErrorFile error={"hello"} setError={setError}/>
    <Box  sx={{display: 'flex', justifyContent: 'center' }}   >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          border:1,
          borderRadius:5,
          borderColor:"#2e7d32",
          maxWidth: { xs: "600px", sm: "600px", md:"600px"},
          minWidth: { xs: "300px", sm: "500px", md:"600px"}
        }}
        mt={6} p={3}
        spacing={2}
        noValidate
        autoComplete="on"
      >

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <InputField value={email} setValue={setEmail} label={'email'}/>
          <InputField value={password} setValue={setPassword} label={'password'}/>
          <Container sx={{
            maxWidth: { xs: "600px", sm: "600px", md:"400px"}
          }}>
            <Button variant="contained" color="success"  type="submit" fullWidth>
              Submit
            </Button>
          </Container>
        </Stack>
      </Box>

    </Box>
  <p>{error}</p>
    </>

  )
}