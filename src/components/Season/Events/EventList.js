import React from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';

import EventCard from './EventCard';
import Loading from '../../Shared/Loading';
import EmptyState from '../../Shared/EmptyState';
import withEventsQuery from '../../../graphql/queries/eventsQuery';

const EventList = ({ events, seasonId }) => {
  if (events.loading) {
    return <Loading text="Laddar rundor..." />;
  }

  if (events.events.length === 0) {
    return <EmptyState text="Inga rundor :(" />;
  }

  return (
    <ul>
      {events.events.map(event => (
        <EventCard key={event.id} seasonId={seasonId} event={event} />
      ))}
    </ul>
  );
};

EventList.propTypes = {
  events: shape({
    loading: bool.isRequired,
    events: arrayOf(shape()),
  }).isRequired,
  seasonId: string.isRequired,
};

export default withEventsQuery(EventList);
