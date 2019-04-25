import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { SetErrors } from './errorDisplay';

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
    padding: 10px;
  }
`;

const Header = () => {
  const [isLoggedOn, setIsLoggedOn] = useState(false);

  useEffect(() => {
    async function checkLoggedOnStatus() {
      const userCookie = Cookies.get('userData');
      console.log(`usercookie: ${userCookie}`);
      if (userCookie) {
        try {
          const resp = await Axios(`/users/${userCookie}`);
          setIsLoggedOn(resp.data.valid);
          return;
        } catch (e) {
          // This is expected if we're not logged in, so do nothing
        }
      }
      setIsLoggedOn(false);
    }
    checkLoggedOnStatus();
  }, []);
  return (
    <HeaderStyle>
      <Link onClick={() => SetErrors(null)} to="/">
        Home
      </Link>
      <Link hidden={!isLoggedOn} onClick={() => SetErrors(null)} to="/create">
        Create new Entry
      </Link>
      <Link hidden={isLoggedOn} onClick={() => SetErrors(null)} to="/newUser">
        Create new User
      </Link>
      <Link hidden={isLoggedOn} onClick={() => SetErrors(null)} to="/logon">
        Log on
      </Link>
      <Link hidden={!isLoggedOn} onClick={() => SetErrors(null)} to="/entries">
        My Entries
      </Link>
    </HeaderStyle>
  );
};

export default Header;
