import React from 'react';
import { shape, string, bool } from 'prop-types';

import moment from 'moment';
import 'moment/locale/sv';

import CourseName from './CourseName';

const EventCard = ({ event }) => {
  let gametypeName = '';
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng';
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng';
  } else {
    gametypeName = 'Slag';
  }

  const isLive =
    event.scoringSessions.filter(ss => ss.status === 'live').length > 0;

  const className = isLive ? 'live' : event.status;

  return (
    <li className={className}>
      <h3>
        {moment(event.startsAt)
          .format('ddd DD MMM')
          .toUpperCase()}
      </h3>

      <span>
        {event.teamEvent ? 'Lag' : 'Individuellt'}
        {' ↝ '}
        {gametypeName}
      </span>

      <CourseName course={event.course} oldCourseName={event.oldCourseName} />
    </li>
  );
};

EventCard.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: shape({
      id: string,
      name: string,
    }),
  }).isRequired,
};

export default EventCard;
