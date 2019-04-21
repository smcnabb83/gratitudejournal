import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SetErrors } from './errorDisplay';

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
    padding: 10px;
  }
`;

const Header = () => (
  <HeaderStyle>
    <Link onClick={() => SetErrors(null)} to="/">
      Home
    </Link>
    <Link onClick={() => SetErrors(null)} to="/create">
      Create new Entry
    </Link>
    <Link onClick={() => SetErrors(null)} to="/newUser">
      Create new User
    </Link>
    <Link onClick={() => SetErrors(null)} to="/logon">
      Log on
    </Link>
  </HeaderStyle>
);

export default Header;
