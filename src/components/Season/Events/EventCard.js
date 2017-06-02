import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment/locale/sv'

const EventCard = ({ seasonId, event, isUsedAsHeader }) => {
  let gametypeName = ''
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng'
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng'
  } else {
    gametypeName = 'Slag'
  }

  const canBeFinished =
    event.status !== 'finished' && event.scoringSessions.length > 0

  const isLive =
    event.scoringSessions.filter(ss => ss.status === 'live').length > 0

  const className = isLive ? 'live' : event.status

  return (
    <li className={className}>
      <h3>{moment(event.startsAt).format('ddd DD MMM').toUpperCase()}</h3>

      <span>
        {event.teamEvent ? 'Lag' : 'Individuellt'}
        {' ↝ '}
        {gametypeName}
      </span>

      {event.course
        ? <div>
          <span style={{ fontSize: 16, lineHeight: 1.5 }}>
            {event.course.club}
          </span>
          <br />
          <span style={{ fontSize: 16, lineHeight: 1.5 }}>
            {event.course.name}
          </span>
        </div>
        : <span style={{ fontSize: 16, lineHeight: 1.5 }}>
          {event.oldCourseName}
        </span>}

      {!isUsedAsHeader && canBeFinished
        ? <Link to={`seasons/${seasonId}/events/${event.id}`}>
            MARKERA SOM FÄRDIGSPELAD
          </Link>
        : null}
    </li>
  )
}

const { shape, string, bool } = React.PropTypes

EventCard.propTypes = {
  isUsedAsHeader: bool,
  seasonId: string.isRequired,
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: shape({
      id: string,
      name: string
    })
  }).isRequired
}

EventCard.defaultProps = {
  isUsedAsHeader: false
}

export default EventCard
