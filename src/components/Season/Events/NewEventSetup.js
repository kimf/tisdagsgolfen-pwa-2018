import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/sv'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

const Switch = ({ name, value, onValueChange }) => (
  <div>
    <input
      type="checkbox"
      value={name}
      checked={value}
      onChange={onValueChange}
    />
    {name}
  </div>
)

Switch.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool.isRequired,
  onValueChange: React.PropTypes.func.isRequired
}

class NewEventSetup extends Component {
  state = {
    isStrokes: false,
    teamEvent: false,
    isSaving: false,
    error: false,
    startsAt: moment().startOf('day')
  }

  onSubmit = () => {
    this.setState({ isSaving: true })
    const { isStrokes, teamEvent, startsAt } = this.state
    const { seasonId, createEvent, goBack } = this.props
    const scoringType = isStrokes ? 'strokes' : 'points'
    const courseId = this.props.course.id
    const course = this.props.course.name

    createEvent({ seasonId, course, courseId, teamEvent, scoringType, startsAt })
      .then(() => {
        this.setState({ isSaving: false, error: false })
        goBack()
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: e, isSaving: false })
      })
  }

  onDateChange = (startsAt) => {
    this.setState({ startsAt })
  }

  render() {
    const { changeCourse, course } = this.props
    const { teamEvent, isStrokes, startsAt, isSaving, error } = this.state
    let showError
    if (error) {
      showError = <div style={{ color: '#c00', fontSize: 20 }}>Något gick fel med att spara, se över infon</div>
    }

    return (
      <div className="container">
        <div>
          <h3>{course.name}</h3>
          <button onClick={() => changeCourse(null)}>
            Byt bana
          </button>
        </div>

        {showError}

        <div>
          <div>
            <span>Lagtävling?</span>
            <Switch
              name="teamEvent"
              onValueChange={te => this.setState({ teamEvent: te })}
              value={teamEvent}
            />
          </div>
          <div>
            <span>Slaggolf?</span>
            <Switch
              name="isStrokes"
              onValueChange={isS => this.setState({ isStrokes: isS })}
              value={isStrokes}
            />
          </div>
        </div>

        <div>
          <input type="date" value={startsAt} onChange={d => this.onDateChange(d)} />
        </div>


        { isSaving || !startsAt
          ? null
          :
          <button onClick={this.onSubmit}>
            SKAPA RUNDA
          </button>
        }
      </div>
    )
  }
}

const { string, number, shape, func } = React.PropTypes

NewEventSetup.propTypes = {
  course: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired,
  changeCourse: func.isRequired,
  goBack: func.isRequired,
  createEvent: func.isRequired,
  seasonId: string.isRequired
}

const createEventMutation = gql`
  mutation createEvent(
    $seasonId:ID!,
    $course: String!,
    $courseId:Int!,
    $teamEvent:Boolean!,
    $scoringType:String!,
    $startsAt:DateTime!
  )
  {
    createEvent(
      seasonId: $seasonId,
      courseId: $courseId,
      course: $course,
      teamEvent: $teamEvent,
      scoringType: $scoringType,
      startsAt: $startsAt,
      status: "planned",
      oldId: 0
    ) {
      id
      status
      startsAt
      course
      courseId
      scoringType
      teamEvent
      oldId
    }
  }
`

const NewEventSetupWithMutation = graphql(createEventMutation, {
  props({ mutate }) {
    return {
      createEvent({ seasonId, courseId, course, teamEvent, scoringType, startsAt }) {
        return mutate({
          variables: { seasonId, courseId, course, teamEvent, scoringType, startsAt },
          updateQueries: {
            eventsForSeasonQuery: (prev, { mutationResult }) => {
              const newEvent = mutationResult.data.createEvent
              return update(prev, {
                events: {
                  $unshift: [newEvent]
                }
              })
            }
          }
        })
      }
    }
  }
})(NewEventSetup)


export default NewEventSetupWithMutation
