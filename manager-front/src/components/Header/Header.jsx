import React, { useContext, useState } from 'react';
import './Header.scss';
import logo from '../../assets/svg/fisacorp-logo.svg';
import { Link, Button, Menu, MenuItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CarouselContext } from '../../contexts/CarouselContext';
import { Router, Link as RouterLink } from 'react-router-dom';

export default function Header({ onLinkClick }) {
  const { activeSlide, setActiveSlide } = useContext(CarouselContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeLinkStyle = {
    color: '#15E823',
    textDecoration: 'none',
    backgroundColor: 'transparent',
    textShadow: '0px 0px 1px #15E823',
  };
  const getLinkStyle = (index) => {
    return activeSlide === index ? activeLinkStyle : {};
  };

  return (
    <div className="header-container">
      <img src={logo} alt="Fisa Corp" />
      <div className="header-links-container">
        <Link
          style={getLinkStyle(0)}
          className={'header-links'}
          href="#"
          underline="none"
          onClick={(e) => {
            e.preventDefault();
            setActiveSlide(0);
            onLinkClick(0);
          }}
        >
          Home
        </Link>
        <Link
          style={getLinkStyle(1)}
          className={'header-links'}
          href="#"
          underline="none"
          onClick={(e) => {
            e.preventDefault();
            setActiveSlide(1);
            onLinkClick(1);
          }}
        >
          Sobre
        </Link>
        <Link
          style={getLinkStyle(2)}
          className={'header-links'}
          href="#"
          underline="none"
          onClick={(e) => {
            e.preventDefault();
            setActiveSlide(2);
            onLinkClick(2);
          }}
        >
          Contato
        </Link>
        <Button
          className="header-links login-button"
          endIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          size="small"
        >
          Login
        </Button>
        <Menu
          className="header-menu"
          slotProps={{ paper: { className: 'header-menu-paper' } }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className="header-menu-item" onClick={handleClose}>
            <RouterLink
              to="/login"
              className="header-links header-dropdown-links"
              underline="none"
            >
              Login
            </RouterLink>
          </MenuItem>
          <div className="dropdown-separator"></div>
          <MenuItem
            className="header-menu-item create-account"
            onClick={handleClose}
          >
            <RouterLink
              to="/register"
              className="header-links header-dropdown-links"
              underline="none"
            >
              Criar Conta
            </RouterLink>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
