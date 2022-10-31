import { apiRoute, getApiHeader, imagePath } from '../../utils/helpers';
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import TeacherDetails from '../../components/teacher/TeacherDetails'

const id = ({teacher}) => {
    console.log(teacher.name);
    return (
        <div>
            <Layout>
                <TeacherDetails teachersDetails ={teacher}/>
            </Layout>
        </div>
    );
}

export const getServerSideProps= async (context) =>{
    const res = await fetch(apiRoute(`get-teacher-details/${context.params.id}`));
    const teacher = await res.json();

  return{
      props:{
          teacher
      }
  }
}
export default id;