import React, { Fragment } from 'react';
import Footer from './common/Footer';
import Header from './common/Header';

export default function Layout({ loading = false, children }) {
  return (
    <Fragment>
      <Header loading={loading} />
      {children}
      <Footer />
    </Fragment>
  );
}
