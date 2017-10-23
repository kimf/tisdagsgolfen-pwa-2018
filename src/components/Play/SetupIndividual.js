import React, { Component } from 'react'
import { func, shape, string, bool } from 'prop-types'
import { withRouter } from 'react-router-dom'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import PlayerCard from './PlayerCard'
import PlayerPicker from './PlayerPicker'

import { withCreateScoringSessionMutation } from '../../graphql/mutations/createScoringSession'

class SetupIndividual extends Component {
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
    const user = props.currentUser
    this.state = {
      playing: [{ ...user, strokes: 0 }]
    }
  }

  onAddPlayer = (player) => {
    const playing = [
      ...this.state.playing,
      { ...player, strokes: 0 }
    ]
    this.setState({ playing })
  }

  onRemove = (player) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, { $splice: [[playingIndex, 1]] })
    this.setState({ playing })
  }

  onChangeStrokes = (player, strokes) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(
      this.state.playing,
      { [playingIndex]: { strokes: { $set: strokes } } }
    )
    this.setState({ playing })
  }

  startPlay = async () => {
    try {
      const { currentUser, courseId, isStrokes, createScoringSession, history } = this.props
      const scoringPlayers = this.state.playing.map(p => (
        { extraStrokes: parseInt(p.strokes, 10), userId: p.id }
      ))
      const scoringType = isStrokes ? 'strokes' : 'points'
      const res = await createScoringSession(
        courseId, currentUser.id, false, scoringType, scoringPlayers
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
        <h3>Valda spelare</h3>
        {playing.map((pl) => {
          const props = {
            onRemove: this.onRemove,
            onChangeStrokes: this.onChangeStrokes
          }
          return <PlayerCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
        })}

        <PlayerPicker addedIds={playing.map(p => p.id)} onAdd={this.onAddPlayer} />

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
)(SetupIndividual)

