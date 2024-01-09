import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from './App';
import Concursos from './pages/Concursos';
import Numeros from './pages/Numeros';
import Sequencias from './pages/Sequencias';
import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to='/concursos' replace />
      },
      {
        path: 'concursos',
        element: <Concursos />
      },
      {
        path: 'numeros',
        element: <Numeros />
      },
      {
        path: 'sequencias',
        element: <Sequencias />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
