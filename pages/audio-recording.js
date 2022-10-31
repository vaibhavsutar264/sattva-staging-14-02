import React, { Fragment } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function AudioRecording() {
  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>Audio Recordings.</title>
      </Head>
      <main>
        <section class='sec sec-inabout'>
          <div className='container'>
            <h4>Audio Recordings</h4>
            <p>
              Very soon,{' '}
              <a href='https://www.sattvaconnect.com' title=''>
                we
              </a>{' '}
              will share a selection of our audio recordings from our wisdom
              library with you. Stay tuned.
            </p>
            <p>
              The teachings in these audio recordings have the potential to
              transform your life into one that is a declaration of love, joy,
              and peace!
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
