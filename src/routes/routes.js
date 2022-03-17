import React from "react";
import {Routes ,Route} from 'react-router-dom';
import {Layout} from '../components/Layout/Layout';
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {SignUp} from "../pages/SignUp";


export const RoutesTodo=()=>{

  return (
    <Routes>
      <Route path ="/" element={<Layout />} >
        <Route path ='login' element={<Login/>} />
        <Route path ='signup' element={<SignUp/>} />
        <Route path ='nouser' element={<p>No such user Exists</p>} />
        <Route path ='/' element={<Home/>} />
      </Route>
    </Routes>
  )

}