import { Outlet } from "react-router-dom";
import LoggedIn from "../Pages/LoggedIn.jsx";

export default function PublicRoute({ children }) {

  const token = localStorage.getItem("token");

  if (token) {
    return <LoggedIn />
  }
  return <Outlet />;
};
