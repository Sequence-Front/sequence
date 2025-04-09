import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import ScrollTop from './ScrollTop'

const Layout = () => {
  const location = useLocation();

  const isMain = location.pathname === '/'; 

  return (
    <>
      <ScrollTop />
      <Header isMain={isMain} />
      <Outlet />
    </>
  );
};

export default Layout;
