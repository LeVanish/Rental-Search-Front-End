import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './Styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Components/Layout.jsx';
import App from './App.jsx';
import Rentals from './Pages/Rental.jsx';
import RentalTable from './Pages/RentalTable.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import RatingTable from './Pages/RatingTable.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import PublicRoute from './Components/PublicRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App },
      { path: "table", Component: RentalTable },
      { path: "rental", Component: Rentals },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "ratings", Component: RatingTable }
        ]
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "login", Component: Login },
          { path: "signup", Component: Signup }
        ]
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />

    <ToastContainer />
  </StrictMode>,
)
