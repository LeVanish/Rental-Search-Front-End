import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const url = "http://4.237.58.241:3000/user/register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const signup = (email, password) => {
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
          throw new Error(data.message || "Signup Failed");
        }
        return data;
      })
      .then(data => {
        console.log(data);

        toast.success("Singup successful! You may login now");
        navigate("/login");
      })
      .catch(error => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div className="center-page">
      <h1>Signup</h1>
      <form className="center-page" onSubmit={(event) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
          setError("Passwords do not match");
        }
        else {
          signup(email, password);
        }
      }}
      >

        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

        <div className='align-horizontal'>
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
          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />
        </div>

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">
          <button type="button" className='button-link'>Go to Login</button>
        </Link>
      </p>
    </div>
  )
}