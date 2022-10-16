import React from 'react'
import { Route, Routes } from "react-router-dom";

export default function RenderRoutes({ routes, extraProps, switchProps}) {
    console.log('aqui estan las rutas')
    // console.log(routes)
    if (extraProps === void 0) {
      extraProps = {};
    }
  
    if (switchProps === void 0) {
      switchProps = {};
    }
  
    return routes ? <Routes>
        {routes[0].routes.map(function (route, i) {
          console.log(route.component)
        return <Route key={route.key || i} path={route.path} element={<route.component />} />;
      })}
      </Routes> : null;
  }