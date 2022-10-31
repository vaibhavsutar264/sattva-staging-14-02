import React, { Fragment } from 'react';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function comingsoon() {
let msg = {};
let title = {};
    const router = useRouter();
    const {pageName} = router.query;

    if (pageName=='blog'){
      title='Blog.'
         msg= 'Very soon , we will introduce the sattva blog page ,where you can find various interesting blogs';
    }
    else if (pageName=='teachers'){
      title='Teachers.'
     msg ='Very Soon, we are going to introduce this page';
    }
    else if (pageName=='YogicLifestyleBlog'){
      title='Yogic Lifestyle Blog'
     msg ='Namaste This Page Will be Live Soon';
    }
    else {
      title='Coming Soon'
       msg = 'Coming soon';
    }


  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>Coming-soon</title>
      </Head>
      <main>
        <section class='sec sec-inabout coming_soon'>
          <div className='container'>
            <h1>{title}</h1>
            <p>
              {msg}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
