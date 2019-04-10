import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyle = styled.div`
    display: flex;
    flex-direction: row;
    a {
        text-decoration: none;
        padding: 10px;
    }
`;

const Header = props => (
    <HeaderStyle>
        <Link to="/">Home</Link>
        <Link to="/create">Create new Entry</Link>
    </HeaderStyle>
)

export default Header;