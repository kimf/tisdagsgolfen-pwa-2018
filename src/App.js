import React from 'react';
import EventListWithData from './EventList'
import EventFormWithMutation from './EventForm'

const App = () => (
  <div className="wrapper">
    <EventListWithData seasonId="ciyw18xl9x19c01147zpebdk0" />
    <EventFormWithMutation seasonId="ciyw18xl9x19c01147zpebdk0" />
  </div>
)

export default App
