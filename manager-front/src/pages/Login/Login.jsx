import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/auth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    setLoading(true);
    try {
      const response = await signIn(formData);

      if (response.status <= 299) {
        console.log('Login successful!');

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('email', response.data.user.email);
        localStorage.setItem('id', response.data.user.id);

        navigate('/tasks');
      } else {
        setError('Error logging in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            type="email"
            className="login-input"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Senha"
            variant="outlined"
            fullWidth
            type="password"
            className="login-input"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
