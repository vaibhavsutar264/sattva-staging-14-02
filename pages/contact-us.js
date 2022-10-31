import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import ContactUsForm from '../components/ContactUsForm';

const Contactus = () => {
  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Connect with us | Unlimited access to yoga classes online.
        </title>
        <meta
          name='description'
          content='Practice with Sattva Connect today! Find ease and peace, greater joy and love. Sattva Connect is Your Support to an Awakened Life.'
        />
        <meta
          name='keywords'
          content='sattva yoga online, sattva yoga, sattva yoga journey online, yoga and meditation'
        />
        <link
          rel='canonical'
          href='https://www.sattvaconnect.com/contact-us/'
        />
      </Head>
      <ContactUsForm />
    </Layout>
  );
};
export default Contactus;
