import React from 'react';
import Head from 'next/head';
import { apiRoute } from '../../utils/helpers';
import Layout from '../../components/user/Layout';

const TermsOfServices = ({ pageData }) => {
  return (
    <Layout>
      <Head>
        <title>Terms of services</title>
      </Head>
      <div class='light-purplebg'>
        <main>
          <section className='sec sec-inabout '>
            <div class='container'>
              <p>
                <h3 className='revamp-subtitle'>Terms of services</h3>
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: pageData['0'].description,
                }}
              ></div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await fetch(apiRoute('cms-page-data/OQ=='));
  const pageData = await res.json();
  return {
    props: {
      pageData,
    },
    revalidate: 1,
  };
}

export default TermsOfServices;
