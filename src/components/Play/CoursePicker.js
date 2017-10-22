import React, { Component } from 'react'
import { arrayOf, bool, shape, func } from 'prop-types'

import CourseRow from './CourseRow'
import Loading from '../Shared/Loading'
import EmptyState from '../Shared/EmptyState'

import { cacheable } from '../../utils'
import { withCoursesQuery } from '../../graphql/queries/coursesQuery'

const fixString = string => string.trim().replace(/-/g, '').replace(/ /g, '').toLowerCase()

const filterCourses = cacheable((courses, query) => courses.filter((c) => {
  const searchString = fixString(`${c.club}${c.name}`)
  const trimmedQuery = fixString(query)
  return searchString.indexOf(trimmedQuery) !== -1
}))

const getPreviouslyPlayedCourses = cacheable(
  courses => courses.filter(c => c.events.count > 0).sort((a, b) => a.events.count - b.events.count)
)

class CoursePicker extends Component {
  static propTypes = {
    selectCourse: func.isRequired,
    data: shape({
      loading: bool,
      courses: arrayOf(shape())
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      courses: []
    }
  }

  state = { query: '' }

  setSearchQuery = query => this.setState(state => ({ ...state, query }))

  render() {
    const { data, selectCourse } = this.props
    const { query } = this.state

    if (data.loading) {
      return <Loading text="Laddar banor..." />
    }

    if (data.courses.length === 0) {
      return <EmptyState text="Inga banor :(" />
    }

    let courses = []
    let previously = false
    if (query !== '') {
      previously = false
      courses = filterCourses(data.courses, query)
    } else {
      previously = true
      courses = getPreviouslyPlayedCourses(data.courses) || data.courses
    }

    return (
      <div className="form">
        <div className="inputWrapper">
          <input
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Sök bana eller klubb"
            onChange={q => this.setSearchQuery(q.target.value)}
            value={query}
          />
        </div>

        {previously ? <h3>Vanliga banor</h3> : null}

        <ul>
          {courses.map(item =>
            <CourseRow key={`course_row_${item.id}`} course={item} selectCourse={selectCourse} />)}
        </ul>
      </div>
    )
  }
}

export default withCoursesQuery(CoursePicker)

