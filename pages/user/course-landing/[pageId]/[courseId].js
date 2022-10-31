import React, { Component } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../../components/user/Layout';
import dynamic from 'next/dynamic';
const CourseLandingPage = dynamic(
  () => import('../../../../components/user/course/CourseLandingPage'),
  {
    ssr: false,
  }
);

const CourseLanding = ({ pageId, courseId }) => {
  const router = useRouter();
  const { scroll } = router.query;

  return (
    <Layout>
      <CourseLandingPage courseId={courseId} pageId={pageId} scroll={scroll} />
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { pageId, courseId } = params;
  return {
    props: { pageId, courseId },
  };
};
export default CourseLanding;
