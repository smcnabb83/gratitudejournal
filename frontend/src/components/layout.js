import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';
import Cookie from 'js-cookie';
import Axios from 'axios';
import Header from './header';
import Errors from './errorDisplay';
import { UserProvider } from './context/UserContext';

const MainLayout = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
`;

const HeaderArea = styled.div`
  grid-row: 1 span 1;
`;

const BodyArea = styled.div`
  grid-row: 2 span 1;
`;

const Layout = props => {
  const [UserID, SetUserID] = useState(false);
  useEffect(() => {
    const cookie = Cookie.get('userData');
    Axios(`users/${cookie || 'a'}`)
      .then(() => {
        SetUserID(cookie);
        console.log('Set State');
      })
      .catch(() => {
        SetUserID(null);
        console.log(`error. cookie is ${cookie}`);
      });
  }, []);
  const { children } = props;
  return (
    <UserProvider value={{ UserID, SetUserID }}>
      <MainLayout>
        <HeaderArea>
          <Header />
        </HeaderArea>
        <BodyArea>
          <Errors />
          {children}
        </BodyArea>
      </MainLayout>
    </UserProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
