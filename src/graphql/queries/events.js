/* eslint-disable no-console */

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const events = gql`
  query events($seasonId: ID!) {
    events: allEvents(
      filter: {
        season: { id: $seasonId }
      }
    ) {
      id
      status
      startsAt
      teamEvent
      oldCourseName
      course {
        id
        name
      }
    }
  }
`

const withEventsQuery = graphql(events, {
  options: ({ seasonId }) => ({
    variables: { seasonId }
  }),
  name: 'events'
})

export default withEventsQuery
