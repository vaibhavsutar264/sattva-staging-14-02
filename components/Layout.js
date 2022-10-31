import React, { Fragment } from 'react';
import Footer from './Footer';
import Header from './Header';
import { HeaderNew } from './HeaderNew';
import HomeHeader from './home/HomeHeader';

export default function Layout({ children, isHome = false,isAbout}) {
  return (
    <Fragment>
      {isHome ? <HomeHeader about={isAbout} /> : <Header />}

      {children}
      <Footer />
    </Fragment>
  );
}
