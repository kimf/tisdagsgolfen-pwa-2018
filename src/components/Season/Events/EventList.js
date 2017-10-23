import React from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'

import EventCard from './EventCard'
import Loading from '../../Shared/Loading'
import EmptyState from '../../Shared/EmptyState'
import withEventsQuery from '../../../graphql/queries/events'

const EventList = ({ events, seasonId }) => {
  if (events.loading) {
    return <Loading text="Laddar rundor..." />
  }

  let content = null
  if (events.events.length === 0) {
    content = <EmptyState text="Inga rundor :(" />
  } else {
    content = (<ul>
      {events.events.map(event => (
        <EventCard key={event.id} seasonId={seasonId} event={event} />
      ))}
    </ul>)
  }

  return (
    <div className="eventList">
      {content}
    </div>
  )
}

EventList.propTypes = {
  events: shape({
    loading: bool.isRequired,
    events: arrayOf(shape())
  }).isRequired,
  seasonId: string.isRequired
}

export default withEventsQuery(EventList)
