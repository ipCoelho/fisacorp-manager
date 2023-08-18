import React from 'react';
import { Typography } from '@material-ui/core';
import './TitleText.scss';

export default function TitleText({ title, text }) {
  return (
    <div className="title-text-container">
      <Typography variant="h1" className="title">
        {title}
      </Typography>
      <Typography variant="body1" className="text">
        {text}
      </Typography>
    </div>
  );
}
