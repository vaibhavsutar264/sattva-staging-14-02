import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Constants from '../../../constants';
import Layout from '../../../components/Layout';

const GiftCourseSuccessLanguage = ({ title, email }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(10);
  useEffect(() => {
    setTimeout(() => setRedirect(true), 10000);
    setInterval(() => setCount(count - 1), 1000);
  }, []);

  if (redirect) {
    Router.push(Constants.SITE_URL + '/login');
  }
  return (
    <Layout>
      <div className='t3-wrapper'>
        <main>
          <section class='sec vh-100'>
            <div class='container h-100'>
              <div class='row h-100'>
                <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center'>
                  <div class='thankyou-div'>
                    <img
                      src={Constants.SITE_URL + '/images/correct-green.png'}
                      class='img-fluid'
                    />
                    <p>
                      Jūs sėkmingai išsiuntėte <b> {title} </b> kursą vartotojui{' '}
                      <b>{email}</b>
                    </p>
                    <p>{email}gaus laišką su savo prisijungimo duomenimis.</p>
                    <p>
                      Jei iškils klausimų prašome kreiptis į
                      info@sattvaconnect.com
                    </p>
                    <p>Dėkui už tai, kad prisijungėte.</p>
                    <div class='backdiv'>
                      <h3>Nukreipiame per {count}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { title, email } = params;

  return {
    props: { title, email },
  };
};
export default GiftCourseSuccessLanguage;
