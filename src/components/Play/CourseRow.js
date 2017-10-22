import React from 'react'
import { string, number, shape, func } from 'prop-types'

const CourseRow = ({ course, selectCourse }) => (
  <li onClick={() => selectCourse(course)}>
    {course.name},
    PAR {course.par} -
    {course.holes.count} HÅL,
    {course.club}
  </li>
)

CourseRow.propTypes = {
  course: shape({
    id: string.isRequired,
    club: string.isRequired,
    name: string.isRequired,
    par: number.isRequired,
    holes: shape({
      count: number.isRequired
    }).isRequired
  }).isRequired,
  selectCourse: func.isRequired
}

export default CourseRow
