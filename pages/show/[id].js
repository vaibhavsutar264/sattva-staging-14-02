import { apiRoute, getApiHeader, imagePath } from '../../utils/helpers';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Show from '../../components/Show';

const id = ({post}) => {
    
    return (
        <div>
          <Layout isHome={true}>
         <Show post={post[0]}/>
         </Layout>
        </div>
    );
}

   export const getServerSideProps= async (context) =>{
       
    const res = await fetch(apiRoute(`get-blog-data/${context.params.id}`));
    const post = await res.json();

  return{
      props:{
          post
      }
  }

}

export default id;