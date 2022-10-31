import React from 'react';
import Courseview from '../../../../components/user/course/Courseview';
const CourseDetails = ({ pageId, courseId }) => {
  return (
    <div>
      <Courseview pageId={pageId} courseId={courseId} />
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const { pageId, courseId } = params;

  return {
    props: { courseId, pageId },
  };
};
export default CourseDetails;
