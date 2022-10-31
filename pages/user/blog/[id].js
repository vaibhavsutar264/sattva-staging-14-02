import { apiRoute, getApiHeader, imagePath } from '../../../utils/helpers';
import React, { useState, useEffect } from 'react';
import Layout from '../../../components/user/Layout';
import ShowInner from '../../../components/user/ShowInner';


const id = ({post}) => {
    
    return (
        <div>
          <Layout isHome={true}>
         <ShowInner post={post[0]}/>
         </Layout>
        </div>
    );
}

   export const getServerSideProps= async (context) =>{
       
    const res = await fetch(apiRoute(`get-blog-data/${context.params.id}`));
    const post = await res.json();
    console.log(post);
  return{
      props:{
          post
      }
  }

}

export default id;