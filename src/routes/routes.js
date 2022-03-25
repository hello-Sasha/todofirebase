import React from "react";
import {Routes ,Route} from 'react-router-dom';
import {Layout} from '../components/Layout/Layout';
import {Home} from "../pages/Home";
import {Login} from "../pages/Login";
import {SignUp} from "../pages/SignUp";
import {PrivateRoute} from "../components/PrivateRoute/PrivateRoute";



export const RoutesTodo=()=>{

  return (
    <Routes>
      <Route path ="/" element={<Layout />} >
        <Route path ='login' element={<Login/>} />

        <Route path ='nouser' element={<p>No such user Exists</p>} />
        <Route path ='/' element={<PrivateRoute> <Home/> </PrivateRoute>} />
        <Route path ='signup' element={<PrivateRoute> <SignUp/> </PrivateRoute>} />


      </Route>
    </Routes>
  )

}