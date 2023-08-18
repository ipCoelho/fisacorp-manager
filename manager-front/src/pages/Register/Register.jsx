import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import './Register.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';
import { Typography } from '@mui/material';
import { register } from '../../services/auth'; // Import the register function

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await register(formData); // Use the register function
      // Handle successful registration here, e.g., redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || 'Could not register.'); // Axios errors are in err.response.data
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logo} alt="Logo" className="register-logo" />
        <Typography
          style={{
            fontSize: '16px',
            fontWeight: '600',
            textAlign: 'left',
            alignSelf: 'stretch',
            marginBottom: '1rem',
            color: '#9DA19D',
          }}
        >
          Cadastro
        </Typography>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          type="text"
          className="register-input"
        />
        <form onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            type="email"
            className="register-input"
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            className="register-input"
          />
          <TextField
            label="Confirme a Senha"
            variant="outlined"
            fullWidth
            type="password"
            className="register-input"
          />
          <Button
            variant="contained"
            color="primary"
            className="register-button"
          >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}
