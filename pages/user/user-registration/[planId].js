import React from 'react';
import Head from 'next/head';
import Layout from '../../../components/user/Layout';
import RegistrationForm from '../../../components/user/RegistrationForm';

const UserRegistration = ({ planId }) => {
  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>
          Sign up | Unlimited access to hundreds of yoga classes online
        </title>
        <meta
          name='description'
          content='A monthly and yearly subscription gives you unlimited access to hundreds of yoga classes online. Be inspired. Live inspired. Sattva Connect.'
        />
      </Head>
      <div className='t3-wrapper'>
        <main>
          <div className='sec sec-cinfo'>
            <div className='container'>
              <div className='customer-support p-0'>
                <h4>{planId == 5 ? 'Yearly' : 'Monthly'} Subscription</h4>
                <div className='card-panel sattva-error'>
                  <p>
                    Please enter information on the form below to process
                    subscription for{' '}
                    <strong>{planId == 5 ? 'Yearly' : 'Monthly'}</strong>. The
                    price&nbsp;<strong>${planId == 5 ? '210' : '21'}</strong>.
                  </p>
                </div>
                <RegistrationForm planId={planId} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};
export const getServerSideProps = async ({ params }) => {
  const { planId } = params;
  return {
    props: { planId },
  };
};
export default UserRegistration;
