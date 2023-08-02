import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Login.module.scss';
import logo from '../../assets/images/Flipd_logo.png';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  // check for cookie to automatically login user
  useEffect(() => {
    fetch('/verifyCookie')
    .then(res => res.json())
    .then(verified => {
      if (verified) {
        navigate('/home');
      }
    })
    .catch(err => {
      console.log('Error verifying cookie: ', err);
    });
  }, []);

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
      data ? navigate('/home') : setErrorMsg(true);
    })
    .catch(err => {
      console.log('Error fetch /login: ', err);
    });
  };

  return (
    <div className={style.loginPage}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <div>
          <img src={logo} alt='Flipped logo'/>
        </div>
        <h1>Welcome</h1>
        <label htmlFor='username'>Username</label>
        <input name='username' id='username' type='text' autoComplete='off' required
          onChange={(e) => {setUsername(e.target.value)}}>
        </input>
        <label htmlFor='password'>Password</label>
        <input name='password' id='password' type='password' required
          onChange={(e) => {setPassword(e.target.value)}}>
        </input>
        {errorMsg && <p>*Invalid Username or Password</p>}
        <button className={style.loginBtn} type='submit'>Login</button>
        <p>or</p>
        <Link to={'/create_account'}>Create Account</Link>
      </form>
    </div>
  )
};

export default Login;