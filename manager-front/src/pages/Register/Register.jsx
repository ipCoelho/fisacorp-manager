import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@material-ui/core';
import './Register.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';
import { Typography } from '@mui/material';
import { register } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      console.log(formData);
      const response = await register({
        username: formData.name,
        password: formData.password,
        email: formData.email,
      });

      console.log(response.data, response.status);

      if (response.status <= 299) {
        console.log('Usuário criado!');
        navigate('/home');
      } else {
        console.log('Erro ao criar usuário!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not register.');
      console.log(err);
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
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="register-input"
        />
        <form onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
          />
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
          />
          <TextField
            label="Confirme a Senha"
            variant="outlined"
            fullWidth
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="register-input"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="register-button"
          >
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}
