import React from 'react';
import { string, number, shape, func } from 'prop-types';

const CourseRow = ({ course, selectCourse }) => (
  <li onClick={() => selectCourse(course)}>
    {course.name}, PAR {course.par} -
    {course.holeCount} HÅL,
    {course.club}
  </li>
);

CourseRow.propTypes = {
  course: shape({
    id: string.isRequired,
    club: string.isRequired,
    name: string.isRequired,
    par: number.isRequired,
    holeCount: number.isRequired,
  }).isRequired,
  selectCourse: func.isRequired,
};

export default CourseRow;
