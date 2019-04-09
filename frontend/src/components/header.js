import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Header = props => (
    <div>
        <Link to="/">Home</Link>
        <Link to="/create">Create new Entry</Link>
    </div>
)

export default Header;