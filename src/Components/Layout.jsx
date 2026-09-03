import RentalNavbar from "./RentalNavbar";
import { Outlet } from "react-router-dom";
import '../Styles/Layout.css';

export default function Layout() {
  return (
    <div className="wrapper">
      <RentalNavbar />
      <main className="content pb-2 px-3">
        <div className='page-container'>
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <p>© Ivan Ostapenko (n11421860), CAB230 26Se1 AT2</p>
      </footer>
    </div>
  )
}