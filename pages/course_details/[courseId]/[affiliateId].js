import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import DharmaLandingPage from '../../../components/course/DharmaLandingPage';
import dynamic from 'next/dynamic';
const CourseLandingPage = dynamic(
  () => import('../../../components/course/CourseLandingPage'),
  {
    ssr: false,
  }
);

const CourseLanding = ({ courseId, affiliateId }) => {
  return (
    <Layout>
      {courseId == 'MQ==' ? (
        <DharmaLandingPage courseId={courseId} affiliateId={affiliateId} />
      ) : (
        <CourseLandingPage courseId={courseId} affiliateId={affiliateId} />
      )}
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { affiliateId, courseId } = params;

  return {
    props: { courseId, affiliateId },
  };
};
export default CourseLanding;
