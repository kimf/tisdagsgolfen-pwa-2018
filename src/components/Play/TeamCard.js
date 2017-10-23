import React, { Component } from 'react'
import { arrayOf, string, shape, func } from 'prop-types'

import PlayerPicker from './PlayerPicker'

const getPhotoUrl = item => (item.photo ? { uri: item.photo.url } : '/defaultavatar.png')

class SetupPlayingCard extends Component {
  static propTypes = {
    addedIds: arrayOf(string),
    item: shape().isRequired,
    onRemove: func.isRequired,
    onChangeStrokes: func.isRequired,
    onRemovePlayerFromTeam: func.isRequired,
    onAddPlayerToTeam: func.isRequired
  }

  static defaultProps = {
    addedIds: []
  }


  constructor(props) {
    super(props)
    this.state = { strokes: props.item.strokes }
  }

  state = { strokes: 0 }

  onChangeStrokes = (item, strokes) => {
    this.setState(state => ({ ...state, strokes }))
    this.props.onChangeStrokes(item, strokes)
  }

  render() {
    const {
      addedIds, item, onRemove, onRemovePlayerFromTeam, onAddPlayerToTeam
    } = this.props

    const name = `Lag ${item.id + 1}`

    return (
      <div key={`setup_pl_${item.id}`} className="setupPlayingCard">

        <div>
          {item.players.map(player => (
            <img
              style={{ width: 20, height: 20 }}
              key={`team_player_photo_${player.id}`}
              alt={player.firstName}
              src={getPhotoUrl(player)}
            />
          ))}
        </div>

        {name}
        <a onClick={() => onRemove(item)}>Ta bort lag</a>

        <div className="strokes">
          <h6>Extraslag</h6>
          <input
            type="range"
            max={36}
            step={1}
            value={this.state.strokes}
            onChange={event => this.onChangeStrokes(item, event.target.value)}
          />
          {this.state.strokes}
        </div>

        {item.players.map(player => (
          <span key={`teamEvent_item_pl_${player.id}`}>
            <a className="remove" onClick={() => onRemovePlayerFromTeam(item, player)}>
              Ta bort {player.firstName}
            </a>
            {player.firstName} {player.lastName}
          </span>
        ))}
        <PlayerPicker team={item} addedIds={addedIds} onAdd={onAddPlayerToTeam} />
      </div>
    )
  }
}

export default SetupPlayingCard
