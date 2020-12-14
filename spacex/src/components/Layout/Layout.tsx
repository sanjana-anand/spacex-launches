import React from 'react';
import LaunchesContextProvider from '../../context/launches-context';
import Content from '../Content/Content';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <React.Fragment>
        <LaunchesContextProvider>
            <Header />
            <Content />
        </LaunchesContextProvider>
    </React.Fragment>
  );
}

export default Layout;