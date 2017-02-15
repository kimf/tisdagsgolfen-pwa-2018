import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import SeasonPicker from '../components/Season/SeasonPicker'
import Season from '../components/Season/Season'
import Loading from '../components/Shared/Loading'

class Home extends Component {
  render() {
    const { loading, user, seasons } = this.props.data
    if (loading) {
      return (
        <div className="container">
          <Loading text="Startar golfbilarna..." />
        </div>
      )
    }

    const currentSeasonName = this.props.match.params.seasonName
    if (!currentSeasonName || currentSeasonName === '') {
      return <Redirect to={`/${seasons[0].name}`} />
    }

    const season = seasons.find(s => s.name === currentSeasonName)

    return (
      <div className="wrapper">
        <Link to="/profile"> 🏌Profil </Link>
        <hr />

        <SeasonPicker
          seasons={seasons}
          currentSeasonName={season.name}
        />

        <div style={{ flex: 1, backgroundColor: '#fff', alignItems: 'stretch' }}>
          <Season seasonName={season.name} seasonId={season.id} userId={user.id} />
        </div>
      </div>
    )
  }
}

const { bool, string, array, shape } = React.PropTypes

Home.propTypes = {
  data: shape({
    loading: bool.isRequired,
    user: shape({
      id: string
    }),
    seasons: array
  }).isRequired,
  match: shape({
    params: shape({
      seasonName: string
    })
  }).isRequired
}


const userQuery = gql`
  query {
    user {
      id
    }
    seasons: allSeasons(orderBy: name_DESC) {
      id
      name
    }
  }
`

export default graphql(userQuery)(Home)
