import React, { Component } from 'react'
import { shape, func, string, bool } from 'prop-types'
import { withRouter } from 'react-router-dom'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import TeamCard from './TeamCard'

import { withCreateScoringSessionMutation } from '../../graphql/mutations/createScoringSession'

class SetupTeamEvent extends Component {
  static propTypes = {
    courseId: string.isRequired,
    isStrokes: bool.isRequired,
    currentUser: shape().isRequired,
    createScoringSession: func.isRequired,
    history: shape({
      push: func.isRequired
    }).isRequired
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

  onAddPlayerToTeam = (player, team) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(
      this.state.playing,
      { [teamIndex]: { players: { $push: [player] } } }
    )

    this.setState({ playing })
  }

  startPlay = async () => {
    try {
      const { courseId, isStrokes, currentUser, createScoringSession, history } = this.props

      const scoringTeams = this.state.playing.map(team => (
        { extraStrokes: parseInt(team.strokes, 10), usersIds: team.players.map(p => p.id) })
      )
      const scoringType = isStrokes ? 'strokes' : 'points'
      const res = await createScoringSession(
        courseId, currentUser.id, true, scoringType, null, scoringTeams
      )
      history.push(`/spela/${res.data.createScoringSession.id}`)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  render() {
    const { playing } = this.state

    const addedIds = [].concat(...playing.map(t => t.players)).map(p => p.id)

    return (
      <div>
        <a onClick={this.onAddTeam}>+ LÄGG TILL LAG</a>
        {playing.map((team) => {
          const props = {
            addedIds,
            onRemove: this.onRemove,
            onChangeStrokes: this.onChangeStrokes,
            onRemovePlayerFromTeam: this.onRemovePlayerFromTeam,
            onAddPlayerToTeam: this.onAddPlayerToTeam,
            teamEvent: true
          }
          return <TeamCard key={`setup_team_${team.id}`} item={team} {...props} />
        })}
        <button className="bottomButton" onClick={this.startPlay}>STARTA RUNDA</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.user,
  courseId: state.app.play.course.id,
  isStrokes: state.app.play.isStrokes
})

export default compose(
  connect(mapStateToProps),
  withCreateScoringSessionMutation,
  withRouter
)(SetupTeamEvent)
