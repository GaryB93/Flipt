import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../Login/Login.module.scss';
import logo from '../../assets/images/Flipt_logo.png';

const NewAccount = () => {
  const [username, setUsername] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [errMsg1, setErrMsg1] = useState(false);
  const [errMsg2, setErrMsg2] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password1 === password2) {
      fetch('/createAccount', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ username, password1 })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          navigate('/home')
        } else {
          setErrMsg1(true);
          setErrMsg2(false);
        }
      })
      .catch(err => {
        console.log('Error fetch /login: ', err);
      });
    } else {
      setErrMsg1(false);
      setErrMsg2(true);
    }
  }

  return (
    <div className={style.loginPage}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        <div>
          <img src={logo} alt='Flipped logo'/>
        </div>
        <h1>New Account</h1>
        <label htmlFor='newUsername'>Username</label>
        <input name='newUsername' id='newUsername' type='text' autoComplete='off' required
          onChange={(e) => {setUsername(e.target.value)}}/>
        <label htmlFor='password'>Password</label>
        <input name='password' id='password' type='password' required
          onChange={(e) => {setPassword1(e.target.value)}}/>
        <label htmlFor='retype-password'>Retype Password</label>
        <input name='retype-password' id='retype-password' type='password' required
          onChange={(e) => {setPassword2(e.target.value)}}/>
        {errMsg1 && <p>*Username already exists</p>}
        {errMsg2 && <p>*Passwords do not match</p>}
        <button className={style.loginBtn} type='submit'>Create Account</button>
        <p>or</p>
        <Link to={'/'}>Back to login</Link>
      </form>
    </div>
  )
};

export default NewAccount;