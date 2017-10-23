import React, { Component } from 'react'
// import { string, func } from 'prop-types'
import withCreateSeasonMutation from '../../graphql/mutations/createSeason'

import Header from '../Shared/Header'

class NewSeason extends Component {
  state = { name: '' }

  onChange = (name) => {
    this.setState({ name })
  }

  save = async () => {
    const { createSeason, history } = this.props
    const { name } = this.state
    try {
      const response = await createSeason(name)
      history.push(`/${response.data.season.name}`)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  render() {
    const { name } = this.state
    return (
      <div className="container form">
        <Header title="Skapa ny säsong" goBack />
        <div className="inputWrapper">
          <label htmlFor="name">Säsongens namn</label>
          <input
            name="name"
            type="text"
            onChange={event => this.onChange(event.target.value)}
            value={name}
          />
        </div>
        <button onClick={this.save}>SPARA</button>
      </div>
    )
  }
}

export default withCreateSeasonMutation(NewSeason)
