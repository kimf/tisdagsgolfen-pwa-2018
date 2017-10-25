import React, { Component } from 'react';
import { arrayOf, bool, shape, func } from 'prop-types';
// import geolib from 'geolib'

import CourseRow from './CourseRow';
import Loading from '../Shared/Loading';
import EmptyState from '../Shared/EmptyState';

import { cacheable } from '../../utils';
import { withCoursesQuery } from '../../graphql/queries/coursesQuery';

const fixString = string =>
  string
    .trim()
    .replace(/-/g, '')
    .replace(/ /g, '')
    .toLowerCase();

const filterCourses = cacheable((courses, query) =>
  courses.filter(c => {
    const searchString = fixString(`${c.club}${c.name}`);
    const trimmedQuery = fixString(query);
    return searchString.indexOf(trimmedQuery) !== -1;
  }),
);

// const nearbyCourses = cacheable(
//   (location, courses) => {
//     console.log(location)
//     geolib.orderByDistance(location, courses)
//   }
// )

const getPreviouslyPlayedCourses = cacheable(courses =>
  courses
    .filter(c => c.events.count > 0)
    .sort((a, b) => a.events.count - b.events.count),
);

class CoursePicker extends Component {
  static propTypes = {
    selectCourse: func.isRequired,
    data: shape({
      loading: bool,
      courses: arrayOf(shape()),
    }),
  };

  static defaultProps = {
    data: {
      loading: true,
      courses: [],
    },
  };

  state = { query: '', location: null };

  // componentWillMount() {
  //   const options = {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0
  //   }

  //   // eslint-disable-next-line no-console
  //   const error = err => console.warn(`ERROR(${err.code}): ${err.message}`)
  //   const success = (pos) => {
  //     this.setState(state => ({ ...state, location: pos.coords }))
  //   }

  //   navigator.geolocation.getCurrentPosition(success, error, options)
  // }

  setSearchQuery = query => this.setState(state => ({ ...state, query }));

  render() {
    const { data, selectCourse } = this.props;
    const { query /* location */ } = this.state;

    // if (!location) {
    //   return <Loading text="Kollar position..." />
    // }

    if (data.loading) {
      return <Loading text="Laddar banor..." />;
    }

    if (data.courses.length === 0) {
      return <EmptyState text="Inga banor :(" />;
    }

    // const coursesByLocation = nearbyCourses(location, data.courses)

    let courses = [];
    let previously = false;
    if (query !== '') {
      previously = false;
      courses = filterCourses(data.courses, query);
    } else {
      previously = true;
      courses = getPreviouslyPlayedCourses(data.courses) || data.courses;
    }

    return (
      <div className="form">
        <div className="inputWrapper">
          <input
            autoCapitalize="words"
            placeholder="Sök bana eller klubb"
            onChange={q => this.setSearchQuery(q.target.value)}
            value={query}
          />
        </div>

        {previously ? <h3>Vanliga banor</h3> : null}

        <ul>
          {courses.map(item => (
            <CourseRow
              key={`course_row_${item.id}`}
              course={item}
              selectCourse={selectCourse}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default withCoursesQuery(CoursePicker);
