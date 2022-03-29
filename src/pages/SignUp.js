import React, {useState} from 'react';
import {InputField} from "../components/InputField/InputField";
import {useAuth} from "../features/AuthContextProvider";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import {ErrorFile} from "../components/error/ErrorFile";



export const SignUp= () =>{
  const navigate=useNavigate();
  const {signUpEp}=useAuth();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[passwordRep,setPasswordRep]=useState('');
  const[errorMessage,setErrorMessage]=useState('');
  const[inputErrors,setInputErrors]=useState({
    email: null,
    password: null,
    passwordRep: null
  });
  const showError =
    errorMessage!==""?
      <ErrorFile error={errorMessage} setError={setErrorMessage}/>
      : "";
  const onSubmit=(e)=>{
    if(email===''){
      setInputErrors(prevState =>(
        {
          ...prevState,
          email:"field can't be empty"
        }
      ))
    }
    if(password===''){
      setInputErrors(prevState =>(
        {
          ...prevState,
          password:"field can't be empty"
        }
      ))
    }
    if(passwordRep!==password){
      setInputErrors(prevState =>(
        {
          ...prevState,
          passwordRep:"Please make sure your passwords match."
        }
      ))
    }
    signUpEp(email, password)
      .then(()=>{
        navigate('/');
      })
      .catch((e)=>{
        setErrorMessage(e.message);
      })
    e.preventDefault();
  }

  return (
    <>
      {showError}
    <Box  sx={{display: 'flex', justifyContent: 'center' }}   >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          border:1,
          borderRadius:5,
          borderColor:"#2e7d32",
          maxWidth: { xs: "600px", sm: "600px", md:"600px"},
          minWidth: { xs: "300px", sm: "500px", md:"600px"},
        }}
        mt={6} p={3}
        spacing={2}
        noValidate
        autoComplete="on"
      >
        <Typography variant="h4" gutterBottom component="div" color="#1b5e20" align="center">
          Register
        </Typography>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <InputField value={email} setValue={setEmail} label={'email'} errorMessage={inputErrors.email}/>
          <InputField value={password} setValue={setPassword} label={'password'} errorMessage={inputErrors.password}/>
          <InputField value={passwordRep} setValue={setPasswordRep} label={'Confirm password'} errorMessage={inputErrors.passwordRep}/>
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
      <Typography mt={2} variant="subtitle1" gutterBottom component="div" color="#1b5e20" align="center">
        Already have an account?
      </Typography>

      <Typography mt={1} variant="subtitle1" gutterBottom component="div" align="center">
        <Button  color="success" onClick={()=>navigate('/login')}>
          <b>Login</b>
        </Button>
      </Typography>
    </>

  )
}