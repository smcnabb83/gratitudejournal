import React from 'react';
import styled from 'styled-components';
import Header from './header';
import Errors from './errorDisplay';

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
    return(<MainLayout>
        <HeaderArea>
            <Header/>
        </HeaderArea>
        <BodyArea>
            <Errors/>
            {props.children}
        </BodyArea>

    </MainLayout>);
}

export default Layout;
