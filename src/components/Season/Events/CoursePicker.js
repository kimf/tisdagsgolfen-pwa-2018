import React, { Component, PropTypes } from 'react'

import clubsJson from '../../../data/clubs.json'

const filter = (data, query) => Object.keys(data)
  .filter(key => key.toLowerCase().indexOf(query) !== -1)
  .reduce((obj, key) => {
    const newObj = Object.assign({}, obj)
    newObj[key] = clubsJson[key]
    return newObj
  }, {})

const CourseRow = ({ course, selectCourse }) =>
  <div onClick={() => selectCourse(course)} key={`course_row_${course.id}`}>
    {course.name} {course.par}
  </div>

CourseRow.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    par: PropTypes.number.isRequired
  }).isRequired,
  selectCourse: PropTypes.func.isRequired
}

class CoursePicker extends Component {
  state = {
    dataSource: clubsJson,
    query: ''
  }

  setSearchQuery = (query) => {
    let newDataSource = null
    if (query !== null && query.length > 1) {
      const filtered = filter(clubsJson, query.toLowerCase())
      newDataSource = filtered
    } else {
      newDataSource = clubsJson
    }
    this.setState({ dataSource: newDataSource, query })
  }

  render() {
    const { query, dataSource } = this.state


    return (
      <div className="container">
        <div>
          <input
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Sök klubb"
            onChangespan={q => this.setSearchQuery(q)}
            value={query}
            type="search"
          />
        </div>
        <ul>
          {dataSource.map(rowData =>
            <CourseRow course={rowData} selectCourse={this.props.selectCourse} />
          )}
        </ul>
      </div>
    )
  }
}

CoursePicker.propTypes = {
  selectCourse: PropTypes.func.isRequired
}

export default CoursePicker
