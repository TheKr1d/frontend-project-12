import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "../index.css";
import Root from "./root.jsx";
import Login from "./login.jsx";
import ErrorPage from "./error-page.jsx";
import * as _ from 'lodash';


const PrivetRoute = ({ children }) => {
  const local = JSON.parse(window.localStorage.getItem("userId"));
  const location = useLocation();

  return (
    _.has(local, 'token') ? children : <Navigate to="/login" state={{ state: location }} />
  );
};

const App = () => (
  <Routes>
    <Route path="/" element={(
      <PrivetRoute>
        <Root />
      </PrivetRoute>
    )}>
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="*" element={<ErrorPage />}/>
  </Routes>
)
export default App;