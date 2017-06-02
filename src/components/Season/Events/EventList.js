import React from 'react'

import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'

const { arrayOf, shape, string } = React.PropTypes

const EventList = ({ events, seasonId }) => {
  if (events.length === 0) {
    return (
      <div style={{ backgroundColor: '#eee' }}>
        <EmptyState text="Inga rundor :(" />
      </div>
    )
  }

  return (
    <div className="eventList">
      <ul>
        {events.map(event => (
          <EventCard key={event.id} seasonId={seasonId} event={event} />
        ))}
      </ul>
    </div>
  )
}

EventList.propTypes = {
  events: arrayOf(shape()).isRequired,
  seasonId: string.isRequired
}

export default EventList
