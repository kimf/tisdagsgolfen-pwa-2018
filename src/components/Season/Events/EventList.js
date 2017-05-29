import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'
import Loading from '../../Shared/Loading'
import Button from '../../Shared/Button'
import EventForm from '../../../EventForm'

const { arrayOf, bool, string, shape, func } = React.PropTypes

const EventList = ({ data, seasonId, gotoEvent, openNewRoundModal }) => {
  if (data.loading) {
    return <Loading text="Laddar rundor..." />
  }

  if (data.events.length === 0) {
    return (
      <div style={{ backgroundColor: '#eee' }}>
        <Button text="+ Lägg till ny runda" onClick={openNewRoundModal} />
        <EventForm seasonId={seasonId} />
        <EmptyState text="Inga rundor :(" />
      </div>
    )
  }

  return (
    <div>
      <ul>
        { data.events.map(event => <li><EventCard event={event} gotoEvent={gotoEvent} /></li>) }
      </ul>
      <Button text="+ Lägg till ny runda" onClick={openNewRoundModal} />
      <EventForm seasonId={seasonId} />
    </div>
  )
}

EventList.propTypes = {
  data: shape({
    loading: bool,
    events: arrayOf(shape())
  }),
  seasonId: string.isRequired,
  gotoEvent: func.isRequired,
  openNewRoundModal: func.isRequired
}

EventList.defaultProps = {
  data: {
    loading: true,
    events: []
  }
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

EventListWithData.propTypes = {
  seasonId: string.isRequired
}

export default EventListWithData
