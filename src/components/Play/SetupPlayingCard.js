import React, { Component } from 'react'
import { shape, func, bool } from 'prop-types'

class SetupPlayingCard extends Component {
  static propTypes = {
    item: shape().isRequired,
    onRemove: func.isRequired,
    onChangeStrokes: func.isRequired,
    onRemovePlayerFromTeam: func,
    onAddPlayerToTeam: func,
    teamEvent: bool.isRequired
  }

  static defaultProps = {
    onRemovePlayerFromTeam: () => { },
    onAddPlayerToTeam: () => { }
  }


  constructor(props) {
    super(props)
    this.state = { strokes: props.item.strokes }
  }

  state = { strokes: 0 }

  getPhotoUrl = item => (item.photo ? { uri: item.photo.url } : '/defaultavatar.png')

  render() {
    const {
      item, onRemove, onChangeStrokes, onRemovePlayerFromTeam, onAddPlayerToTeam, teamEvent
    } = this.props

    const name = teamEvent ? `Lag ${item.id + 1}` : `${item.firstName} ${item.lastName}`
    const photoSrc = this.getPhotoUrl(item)

    return (
      <div>
        <div>
          {teamEvent
            ? <div>
              {item.players.map(player => (
                <img
                  key={`team_player_photo_${player.id}`}
                  alt={player.firstName}
                  src={this.getPhotoUrl(player)}
                />
              ))}
            </div>
            : <img src={photoSrc} alt="item" />
          }
          {name}
          <button onClick={() => onRemove(item)}>
            Ta bort {teamEvent ? 'lag' : 'spelare'}
          </button>
        </div>
        <div>
          <h6>Extraslag</h6>
          <input
            type="range"
            max={36}
            step={1}
            value={this.state.strokes}
            onSlidingComplete={val => onChangeStrokes(item, val)}
            onValueChange={strokes => this.setState({ strokes })}
          />
          {this.state.strokes}
        </div>
        {teamEvent
          ? <div>
            {item.players.map(player => (
              <span>
                <button onClick={() => onRemovePlayerFromTeam(item, player)}>
                  X
                </button>
                {player.firstName} {player.lastName}
              </span>
            ))}
            <button onClick={() => onAddPlayerToTeam(item)}>
              {`+ Lägg till spelare i ${name}`}
            </button>
          </div>
          : null
        }
      </div>
    )
  }
}

export default SetupPlayingCard
