import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

class EventForm extends Component {
  createEvent = (e) => {
    e.preventDefault();
    console.log(this.props);
    const { seasonId, createEvent } = this.props;

    const course = 'Bro Hof'
    const courseId = 690
    const teamEvent = false
    const scoringType = 'strokes'
    const startsAt = new Date()

    createEvent({ seasonId, course, courseId, teamEvent, scoringType, startsAt })
      .then(() => {
        this.setState({ isSaving: false, error: false })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: e, isSaving: false })
      })
  }

  render() {
    return <button onClick={this.createEvent}>SKAPA NY RUNDA</button>
  }
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

const EventFormWithMutation = graphql(createEventMutation, {
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
                    $unshift: [newEvent],
                },
              });
            }
          }
        })
      }
    }
  }
})(EventForm)


export default EventFormWithMutation
