import React, { Component } from 'react'
import { shape, func } from 'prop-types'

const getPhotoUrl = item => (item.photo ? { uri: item.photo.url } : '/defaultavatar.png')

class PlayerCard extends Component {
  static propTypes = {
    item: shape().isRequired,
    onRemove: func.isRequired,
    onChangeStrokes: func.isRequired
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
    const { item, onRemove } = this.props

    const name = `${item.firstName} ${item.lastName}`

    return (
      <div key={`setup_pl_${item.id}`} className="setupPlayingCard">
        <div>
          <img src={getPhotoUrl(item)} style={{ width: 20, height: 20 }} alt="item" />
          {name}
          <a onClick={() => onRemove(item)}>Ta bort</a>
        </div>
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
      </div>
    )
  }
}

export default PlayerCard
