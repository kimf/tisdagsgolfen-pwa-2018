import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Season from '../components/Season/Season'
import Preview from '../components/Preview'
import Loading from '../components/Shared/Loading'

const { bool, func, string, array, shape } = React.PropTypes

const Home = ({ data, onLogout }) => {
  const { loading, user, seasons } = data
  if (loading) {
    return (
      <div className="container">
        <Loading text="Startar golfbilarna..." />
      </div>
    )
  }

  return (
    <Router>
      <div className="wrapper">
        Hej {user.firstName}
        <a
          href="#logout"
          onClick={(e) => {
            e.preventDefault()
            onLogout(user.email)
          }}
        >
          LOGGA UT
        </a>
        <hr />

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div style={{ backgroundColor: '#fff' }}>
                {seasons.map(season => (
                  <Season key={season.id} season={season} userId={user.id} />
                ))}
              </div>
            )}
          />

          <Route
            path="/seasons/:seasonId/events/:eventId"
            render={({ match }) => {
              const season = seasons.find(s => s.id === match.params.seasonId)
              const event = season.events.find(
                e => e.id === match.params.eventId
              )
              return <Preview seasonId={season.id} event={event} />
            }}
          />
        </Switch>

      </div>
    </Router>
  )
}

Home.propTypes = {
  data: shape({
    loading: bool.isRequired,
    user: shape({
      id: string
    }),
    seasons: array
  }).isRequired,
  onLogout: func.isRequired
}

const userQuery = gql`
  query {
    user {
      id
      firstName
    }
    seasons: allSeasons(orderBy: name_DESC) {
      id
      name
      events (
        orderBy: startsAt_DESC,
      ) {
        id
        status
        startsAt
        oldCourseName
        course {
          id
          club
          name
        }
        scoringType
        teamEvent
        season {
          id
        }
        scoringSessions {
          id
          status
          scorer {
            id
          }
        }
      }
    }
  }
`

export default graphql(userQuery)(Home)
