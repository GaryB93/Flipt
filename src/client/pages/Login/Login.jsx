import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data === true) {
        sessionStorage.setItem('username', username);
        navigate('/home');
      }
    })
    .catch(err => {
      console.log('Error fetch /login: ', err);
    });
  };

  return (
    <div className='login-page page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Study Board</h2>
        <label htmlFor='username'>Username</label>
        <input name='username' id='username' type='text' required
          onChange={(e) => {setUsername(e.target.value)}}>
        </input>
        <label htmlFor='password'>Password</label>
        <input name='password' id='password' type='password' required
          onChange={(e) => {setPassword(e.target.value)}}>
        </input>
        <button className='login-btn' type='submit'>Login</button>
        <Link to={'/newAccount'}>Create Account</Link>
      </form>
    </div>
  )
};

export default Login;