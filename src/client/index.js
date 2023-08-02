import React from 'react';
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ErrorPage from './pages/Error';
import NewAccount from './pages/NewAccount/NewAccount';
import './assets/styles/styles.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/home',
    element: <Home/>,
    errorElement: <ErrorPage/>
  },
  {
    path: '/create_account',
    element: <NewAccount/>,
    errorElement: <ErrorPage/>
  }
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);