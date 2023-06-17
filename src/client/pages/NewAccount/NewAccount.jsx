import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NewAccount = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/createAccount', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log(data);
        navigate('/home');
      }
    })
    .catch(err => {
      console.log('Error fetch /login: ', err);
    });
  }

  return (
    <div className='login-page page'>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2>Study Board</h2>
        <label htmlFor='newUsername'>Username</label>
        <input name='newUsername' id='newUsername' type='text' autoComplete='off' required
          onChange={(e) => {setUsername(e.target.value)}}>
        </input>
        <label htmlFor='newPassword'>Password</label>
        <input name='newPassword' id='newPassword' type='password' required
          onChange={(e) => {setPassword(e.target.value)}}>
        </input>
        <button className='login-btn' type='submit'>Create Account</button>
        <Link to={'/'}>Back to login</Link>
      </form>
    </div>
  )
};

export default NewAccount;