import React from 'react';
import { shape, string, bool } from 'prop-types';

import moment from 'moment';
import 'moment/locale/sv';

const EventCard = ({ event }) => {
  let gametypeName = '';
  if (event.scoringType === 'modified_points') {
    gametypeName = 'Modifierad Poäng';
  } else if (event.scoringType === 'points') {
    gametypeName = 'Poäng';
  } else {
    gametypeName = 'Slag';
  }

  return (
    <li className={event.status}>
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
      <span style={{ fontSize: 16, lineHeight: 1.5 }}>{event.course}</span>
    </li>
  );
};

EventCard.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    course: string,
  }).isRequired,
};

export default EventCard;
