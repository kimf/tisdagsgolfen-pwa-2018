import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import Leaderboard from './Leaderboard/Leaderboard'
import EventList from './Events/EventList'
import NewEventForm from './Events/NewEventForm'
import Tabs from './Tabs'

const viewTabs = [
  { value: '/', icon: '🏆', title: 'Ledartavla' },
  { value: '/events', icon: '🗓', title: 'Rundor' }
]

const Season = ({ userId, seasonName, seasonId, push, goBack, location }) => (
  <div className="container">
    <Tabs
      currentRoute={location.pathname.replace(seasonName, '')}
      tabs={viewTabs}
      seasonName={seasonName}
      bottom
    />
    <Switch>
      <Route
        exact
        path="/:seasonName"
        render={() =>
          <Leaderboard
            userId={userId}
            seasonId={seasonId}
            seasonName={seasonName}
          />
        }
      />
      <Route
        exact
        path="/:seasonName/events"
        render={() =>
          <EventList
            userId={userId}
            seasonId={seasonId}
            gotoEvent={eventId => push(`/events/${eventId}`)}
            openNewRoundModal={() => push('/events/new')}
          />
        }
      />
      <Route
        exact
        path="/:seasonName/events/new"
        render={() =>
          <NewEventForm
            seasonId={seasonId}
            goBack={goBack}
          />
        }
      />
    </Switch>
  </div>
)

const { func, shape, string } = React.PropTypes

Season.propTypes = {
  userId: string.isRequired,
  seasonName: string.isRequired,
  seasonId: string.isRequired,
  location: shape({
    pathname: string
  }).isRequired,
  push: func.isRequired,
  goBack: func.isRequired
}

export default withRouter(Season)
