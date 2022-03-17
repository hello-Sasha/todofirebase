import React from 'react';
import {RoutesTodo} from '../../routes/routes';
import {BrowserRouter} from "react-router-dom";

export const App= () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex"
    }}>
      <BrowserRouter>
        <RoutesTodo/>
      </BrowserRouter>
    </div>
  )

};
