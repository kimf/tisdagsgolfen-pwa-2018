import React from 'react'

import EventList from './Events/EventList'

const Season = ({ season, ...rest }) => (
  <div className="container">
    <h2>{season.name}</h2>
    <EventList {...rest} seasonId={season.id} events={season.events} />
  </div>
)

const { shape, string } = React.PropTypes

Season.propTypes = {
  userId: string.isRequired,
  season: shape({
    id: string.isRequired,
    name: string.isRequired
  }).isRequired
}

export default Season
