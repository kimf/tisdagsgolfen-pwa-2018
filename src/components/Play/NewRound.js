import React, { Component } from 'react'

import NewRoundSetup from './NewRoundSetup'
import CoursePicker from './CoursePicker'

class SetupRound extends Component {
  state = {
    course: null,
    teamEvent: false,
    isStrokes: false
  }

  setValue = (key, value) => this.setState(state => ({
    ...state,
    [key]: value
  }))

  render() {
    const { course, teamEvent, isStrokes } = this.state

    return (
      <div>
        <h3>Spela Golf!</h3>
        <hr />
        {course
          ? <NewRoundSetup
            setValue={this.setValue}
            course={course}
            teamEvent={teamEvent}
            isStrokes={isStrokes}
          />
          : <CoursePicker selectCourse={val => this.setValue('course', val)} />
        }
      </div>
    )
  }
}

export default SetupRound
