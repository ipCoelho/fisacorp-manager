import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import './ContactForm.scss';

const ContactForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-container">
      <Typography variant="h5" component="h2" gutterBottom>
        Formulário de Contato
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className="input-field"
          label="Nome Completo"
          variant="outlined"
          fullWidth
        />
        <TextField
          className="input-field"
          label="E-mail"
          variant="outlined"
          fullWidth
        />
        <TextField
          className="input-field"
          label="Assunto"
          variant="outlined"
          fullWidth
        />
        <TextField
          className="input-field text"
          label="Mensagem"
          variant="outlined"
          fullWidth
        />
        <Button
          className="submit-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
