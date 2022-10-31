import Layout from '../components/Layout';
import Head from 'next/head';
import Link from 'next/link';

const SupportSuccess = () => {
  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>Support success.</title>
        <meta name='description' content='Registration success.' />
      </Head>
      <div className='t3-wrapper'>
        <main>
          <section class='sec vh-100'>
            <div class='container h-100'>
              <div class='row h-100'>
                <div class='col-xl-12 col-lg-12 col-md-12 col-sm-12 align-self-center'>
                  <div class='thankyou-div'>
                    <img
                      src={'/images/correct-green.png'}
                      className='img-fluid'
                    />
                    <h3>Thank You!</h3>
                    <h6>Your request is sent successfully.</h6>
                    <p>You can expect to hear back from us within 48 hours.</p>
                    <Link href='/customer-support'>
                      <a className='waves-effect btn'>SEND A NEW INQUIRY</a>
                    </Link>
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

export default SupportSuccess;
