import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoggedIn() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");

    toast.success("Logout successful!");
    navigate("/");
  }

  return (
    <div className="center-page">
      <h2>You are already logged in</h2>
      <p>
        Return to {" "}
        <Link to="/">
          <button type="button" className='button-link'>Home Page</button>
        </Link>
      </p>

      <Link to="/">
        <button
          type="Button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </Link>
    </div>
  )
}