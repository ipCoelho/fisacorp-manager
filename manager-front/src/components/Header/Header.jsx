import React, { useState } from 'react';
import './Header.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';
import { Link, Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header-container">
      <img src={logo} alt="Fisa Corp" />
      <div className="header-links-container">
        <Link className="header-links-buttons" href="#" underline="none">
          Home
        </Link>
        <Link className="header-links-buttons" href="#" underline="none">
          Sobre
        </Link>
        <Link className="header-links-buttons" href="#" underline="none">
          Contato
        </Link>
        <Button
          className="header-links-buttons"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          size="small"
          style={{ textTransform: 'none', fontSize: '1rem' }}
        >
          Login
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link href="#">Login</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="#">Criar Conta</Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
