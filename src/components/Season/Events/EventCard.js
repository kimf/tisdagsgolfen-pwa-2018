import React from 'react'
import moment from 'moment'
import 'moment/locale/sv'

const EventCard = ({ event, gotoEvent }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }

  return (
    <li onClick={() => gotoEvent(event.id)}>
      {moment(event.startsAt).format('ddd DD MMM').toUpperCase()}

      <span>
        {event.teamEvent ? 'Lag' : 'Individuellt'}
        {' ↝ '}
        {gametypeName}
      </span>

      <span style={{ fontSize: 16, lineHeight: 1.5 }}>{event.club}</span>
      <span style={{ fontSize: 16, lineHeight: 1.5 }}>{event.course}</span>
    </li>
  )
}

const { shape, string, bool, func } = React.PropTypes

EventCard.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: string
  }).isRequired,
  gotoEvent: func.isRequired
}

export default EventCard
