import React, { Component } from 'react';
import Layout from '../../components/Layout';
import DharmaLandingPage from '../../components/course/DharmaLandingPage';
import dynamic from 'next/dynamic';
const CourseLandingPage = dynamic(
  () => import('../../components/course/CourseLandingPage'),
  {
    ssr: false,
  }
);

const CourseLanding = ({ courseId }) => {
  return (
    <Layout isHome={true}>
      {courseId == 'MQ==' ? (
        <DharmaLandingPage courseId={courseId} affiliateId={null} />
      ) : (
        <CourseLandingPage courseId={courseId} affiliateId={null} />
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { courseId } = params;

  return {
    props: { courseId },
  };
};
export default CourseLanding;
