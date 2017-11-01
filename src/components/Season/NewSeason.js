import React, { Component } from 'react';
// import { string, func } from 'prop-types'
import withCreateSeasonMutation from '../../graphql/mutations/createSeason';

import Header from '../Shared/Header';

class NewSeason extends Component {
  state = { name: '' };

  onChange = name => {
    this.setState({ name });
  };

  save = async () => {
    const { createSeason, history } = this.props;
    const { name } = this.state;
    try {
      const response = await createSeason(name);
      history.push(`/${response.data.season.name}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  render() {
    const { name } = this.state;
    return [
      <Header key="header" title="Skapa ny säsong" goBack />,
      <div key="container" className="container form">
        <div className="inputWrapper">
          <label htmlFor="name">
            Säsongens namn
            <input
              id="name"
              type="text"
              onChange={event => this.onChange(event.target.value)}
              value={name}
            />
          </label>
        </div>
        <button onClick={this.save}>SPARA</button>
      </div>,
    ];
  }
}

export default withCreateSeasonMutation(NewSeason);
