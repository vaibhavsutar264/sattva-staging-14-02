import React from 'react';
import { useRouter } from 'next/router';
import VideoDetailsPage from '../../../components/user/VideoDetailsPage';

const VideoDetails = ({ id }) => {
  return <VideoDetailsPage videoId={id} />;
};

export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  return {
    props: { id },
  };
};
export default VideoDetails;
