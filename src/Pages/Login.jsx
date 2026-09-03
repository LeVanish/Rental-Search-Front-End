import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const url = "http://4.237.58.241:3000/user/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const login = (email, password) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login Failed");
        }
        return data;
      })
      .then(data => {
        localStorage.setItem("token", data.token);
        console.log(data);

        toast.success("Login successful!");
        navigate("/ratings");

      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };



  return (
    <div className="center-page">
      <form className="center-page" onSubmit={(event) => {
        event.preventDefault();
        login(email, password);
      }}>

        <h1>Login</h1>
        <h4>Log in to view and leave rental ratings</h4>

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <div className='align-horizontal align-items-flex-end'>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>


        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <button type="button" className='button-link'>Go to Signup</button>
        </Link>
      </p>
    </div>
  )

}