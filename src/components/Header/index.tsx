import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <Link to="/">
        <img src={Logo} alt="GoFinances" />
      </Link>
      <nav>
        <NavLink
          to="/"
          exact
          activeStyle={{ borderBottom: '3px solid #ff872c' }}
        >
          Listagem
        </NavLink>
        <NavLink
          to="/import"
          activeStyle={{ borderBottom: '3px solid #ff872c' }}
        >
          Importar
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
