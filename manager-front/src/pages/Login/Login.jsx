import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <TextField
          label="E-mail"
          variant="outlined"
          fullWidth
          type="email"
          className="login-input"
        />
        <TextField
          label="Senha"
          variant="outlined"
          fullWidth
          type="password"
          className="login-input"
        />
        <Button variant="contained" color="primary" className="login-button">
          Login
        </Button>
      </div>
    </div>
  );
}
