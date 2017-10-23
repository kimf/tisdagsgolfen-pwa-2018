import React from 'react'
import { shape, bool, func } from 'prop-types'
import { connect } from 'react-redux'

import Header from '../Shared/Header'
import NewRoundSetup from './NewRoundSetup'
import CoursePicker from './CoursePicker'

import { setPlayValue } from '../../actions/app'

const NewRound = ({ course, teamEvent, isStrokes, setValue }) => (
  <div className="container">
    <Header title="Spela Golf!" goBack />
    {course
      ? <NewRoundSetup
        setValue={setValue}
        course={course}
        teamEvent={teamEvent}
        isStrokes={isStrokes}
      />
      : <CoursePicker selectCourse={val => setValue('course', val)} />
    }
  </div>
)

NewRound.propTypes = {
  course: shape(),
  teamEvent: bool.isRequired,
  isStrokes: bool.isRequired,
  setValue: func.isRequired
}

NewRound.defaultProps = {
  course: null
}

const mapStateToProps = state => ({ ...state.app.play })

const mapDispatchToProps = dispatch => ({
  setValue: (key, val) => dispatch(setPlayValue(key, val))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRound)

