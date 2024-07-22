import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx'
import Login from './login.tsx';
import Signup from './signup.tsx';
import Search from "./search.tsx";
import GameDetail from './gameDetail.tsx';
import { AuthProvider, useAuth } from './authContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/detail",
    element: <GameDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
   <RouterProvider router={router} />
   </AuthProvider>
  </React.StrictMode>
  ,
)
