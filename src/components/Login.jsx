import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { login } from '../utility/index';

const Login = ({ setUser, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw "user not logged in";
        }
      })
      .then((data) => {
        // can change redirect route later
        console.log(data)
        login(data.token)
        setUser(data);
        setIsLoggedIn(true);
        localStorage.setItem('user_id', data.user_id);
        data.is_cook
          ? history.push("/create-recipe")
          : history.push("/search");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="formLogin">
      <form>
        <div className = "subtitle">Log into with your HomeDish account</div>
        <p>
          <TextField
            label="Email"
            type="text"
            id="outlined-basic"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
        </p>
        <p>
          <TextField
            label="Password"
            type="password"
            id="outlined-password-input"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
        </p>
        <button className="log-in-button" onClick={handleSignIn}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
