import React, { Component } from 'react'
import { shape, func } from 'prop-types'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import SetupPlayingCard from './SetupPlayingCard'
import { withCreateScoringSessionMutation } from '../../graphql/mutations/createScoringSession'

class SetupTeamEvent extends Component {
  static propTypes = {
    currentUser: shape().isRequired,
    createScoringSession: func.isRequired
  }

  constructor(props) {
    super(props)

    const playing = [
      {
        id: 0,
        players: [props.currentUser],
        strokes: 0
      }
    ]

    this.state = { playing }
  }

  onRemove = (team) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(this.state.playing, { $splice: [[playingIndex, 1]] })
    this.setState({ playing })
  }

  onAddTeam = () => {
    const oldPlaying = this.state.playing
    const newItem = {
      id: oldPlaying.length,
      players: [],
      strokes: 0
    }
    const playing = oldPlaying.concat(newItem)
    this.setState({ playing })
  }

  onAddPlayer = (player, team) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(
      this.state.playing,
      { [teamIndex]: { players: { $push: [player] } } }
    )

    this.setState({ playing })
  }

  onChangeStrokes = (team, strokes) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(
      this.state.playing,
      { [playingIndex]: { strokes: { $set: strokes } } }
    )

    this.setState({ playing })
  }

  onRemovePlayerFromTeam = (team, player) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playerIndex = this.state.playing[teamIndex].players.findIndex(p => p.id === player.id)
    const playing = update(
      this.state.playing, {
        [teamIndex]: {
          players: { $splice: [[playerIndex, 1]] }
        }
      }
    )
    this.setState({ playing })
  }

  openAddPlayer = (/* team*/) => {
    this.setState(state => ({ ...state, modal: 'addPlayer' }))
    // onAdd: this.onAddPlayer,
    // addedIds: [].concat(...this.state.playing.map(t => t.players)).map(p => p.id),
    // title: `Lägg till i Lag ${team.id + 1}`
  }

  startPlay = async () => {
    try {
      const { currentUser, createScoringSession, navigation, history } = this.props

      const scoringTeams = this.state.playing.map(team => (
        { extraStrokes: team.strokes, usersIds: team.players.map(p => p.id) })
      )

      const event = navigation.state.params.event
      const res = await createScoringSession(
        event.id, event.course.id, currentUser.id, null, scoringTeams
      )
      history.push(`/spela/${res.data.createScoringSession.id}`)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  render() {
    const { playing } = this.state

    return (
      <div>
        <button onClick={this.onAddTeam}>+ LÄGG TILL LAG</button>
        {playing.map((team) => {
          const props = {
            onRemove: this.onRemove,
            onChangeStrokes: this.onChangeStrokes,
            onRemovePlayerFromTeam: this.onRemovePlayerFromTeam,
            onAddPlayerToTeam: () => this.openAddPlayer(team),
            teamEvent: true
          }
          return <SetupPlayingCard key={`setup_team_${team.id}`} item={team} {...props} />
        })}
        <button onClick={this.startPlay}>STARTA RUNDA</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ currentUser: state.app.currentUser })

export default compose(
  connect(mapStateToProps),
  withCreateScoringSessionMutation
)(SetupTeamEvent)
