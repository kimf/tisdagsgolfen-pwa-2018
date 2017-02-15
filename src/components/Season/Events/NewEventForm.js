import React, { Component, PropTypes } from 'react'

import CoursePicker from './CoursePicker'
import NewEventSetup from './NewEventSetup'

class NewEventForm extends Component {
  state = { course: null }

  setCourse = (course) => {
    this.setState({ course })
  }

  render() {
    const { goBack, seasonId } = this.props
    const { course } = this.state
    return (
      <div className="modal">
        <h2>SKAPA NY RUNDA</h2>
        <button onClick={goBack}>Avbryt</button>
        { course
          ?
            <NewEventSetup
              seasonId={seasonId}
              changeCourse={this.setCourse}
              course={course}
              goBack={goBack}
            />
          : <CoursePicker selectCourse={this.setCourse} />
        }
      </div>
    )
  }
}

NewEventForm.propTypes = {
  goBack: PropTypes.func.isRequired,
  seasonId: PropTypes.string.isRequired
}

export default NewEventForm
