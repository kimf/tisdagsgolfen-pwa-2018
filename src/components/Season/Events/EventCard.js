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
    <div onClick={() => gotoEvent(event.id)}>
      <div>
        <div>
          <span>
            {moment(event.startsAt).format('ddd DD MMM').toUpperCase()}
          </span>

          <span>
            {event.teamEvent ? 'Lag' : 'Individuellt'}
            {' ↝ '}
            {gametypeName}
          </span>
        </div>

        <div>
          <span style={{ fontSize: 16, lineHeight: 25 }}>{event.club}</span>
          <span style={{ fontSize: 16, lineHeight: 25 }}>{event.course}</span>
        </div>
      </div>
    </div>
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
