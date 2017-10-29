import React from 'react';
import { string, shape } from 'prop-types';

const CourseName = ({ course, oldCourseName }) => {
  if (course) {
    return (
      <div>
        <span style={{ fontSize: 16, lineHeight: 1.5 }}>{course.club}</span>
        <br />
        <span style={{ fontSize: 16, lineHeight: 1.5 }}>{course.name}</span>
      </div>
    );
  }

  return <span style={{ fontSize: 16, lineHeight: 1.5 }}>{oldCourseName}</span>;
};

CourseName.propTypes = {
  course: shape({
    club: string.isRequired,
    name: string.isRequired,
  }),
  oldCourseName: string,
};

CourseName.defaultProps = {
  course: null,
  oldCourseName: null,
};

export default CourseName;
