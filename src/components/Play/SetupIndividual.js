import React, { Component } from 'react'
import { func, shape } from 'prop-types'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import SetupPlayingCard from './SetupPlayingCard'

import { withCreateScoringSessionMutation } from '../../graphql/mutations/createScoringSession'

class SetupIndividual extends Component {
  static propTypes = {
    currentUser: shape().isRequired,
    createScoringSession: func.isRequired
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
      const { currentUser, course, teamEvent, isStrokes, createScoringSession, history } = this.props
      const scoringPlayers = this.state.playing.map(p => (
        { extraStrokes: p.strokes, userId: p.id }
      ))
      const scoringType = isStrokes ? 'strokes' : 'points'
      const res = await createScoringSession(
        course.id, currentUser.id, teamEvent, scoringType, scoringPlayers
      )
      history.push(`/spela/${res.data.createScoringSession.id}`)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }


  openAddPlayer = () => {
    this.setState(state => ({ ...state, modal: 'addPlayer' }))
    // onAdd: this.onAddPlayer,
    // addedIds: this.state.playing.map(p => p.id)
  }

  render() {
    const { playing } = this.state

    return (
      <div>
        <button onClick={this.openAddPlayer}>+ LÄGG TILL SPELARE</button>
        {playing.map((pl) => {
          const props = {
            onRemove: this.onRemove,
            onChangeStrokes: this.onChangeStrokes,
            teamEvent: false
          }
          return <SetupPlayingCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
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
)(SetupIndividual)

