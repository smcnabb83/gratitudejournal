import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { SetErrors } from './errorDisplay';
import UserContext from './context/UserContext';

const HeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
    padding: 10px;
  }
`;

const funcs = {
  isLoggedOn: null,
  setIsLoggedOn: null,
};

const Header = () => {
  const User = useContext(UserContext);
  return (
    <HeaderStyle>
      <Link onClick={() => SetErrors(null)} to="/">
        Home
      </Link>
      <Link hidden={!User.UserID} onClick={() => SetErrors(null)} to="/create">
        Create new Entry
      </Link>
      <Link hidden={User.UserID} onClick={() => SetErrors(null)} to="/newUser">
        Create new User
      </Link>
      <Link hidden={User.UserID} onClick={() => SetErrors(null)} to="/logon">
        Log on
      </Link>
      <Link hidden={!User.UserID} onClick={() => SetErrors(null)} to="/entries">
        My Entries
      </Link>
      <button
        type="button"
        onClick={() => {
          Cookies.remove('userData');
          User.SetUserID(false);
        }}
        hidden={!User.UserID}
      >
        Log Out
      </button>
    </HeaderStyle>
  );
};

export default Header;
export { funcs };
