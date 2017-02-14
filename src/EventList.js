import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


const EventList = ({ data }) => {
  if (data.loading) {
    return <div>Laddar rundor...</div>
  }

  if (data.events.length === 0) {
    return <div>Inga rundor :(</div>
  }

  return (
    <ul>
      {data.events.map(e => <li key={`event_${e.id}`} className={e.status}>{e.course} {e.startsAt}</li>)}
    </ul>
  )
}


const eventsForSeasonQuery = gql`
  query eventsForSeasonQuery($seasonId: ID!) {
    events: allEvents (
      orderBy: startsAt_DESC,
      filter: { season: { id: $seasonId } }
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

const EventListWithData = graphql(eventsForSeasonQuery, {
  options: ({ seasonId }) => ({ variables: { seasonId } })
})(EventList)


export default EventListWithData
