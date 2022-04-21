import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import Image from '../Image';

import './styles.css';

const NavbarComponent = () => {
  return (
    <Navbar className='navbar-body bg-black c-white' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Image src='spotify.png' className='navbar-logo' />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
