import React, { Component } from 'react';
import { shape, bool, arrayOf, func, number, string } from 'prop-types';

import { withUserQuery } from '../../graphql/queries/userQuery';

const defaultAvatar = '/defaultAvatar.png';

class PlayerPicker extends Component {
  static propTypes = {
    data: shape({
      loading: bool,
      players: arrayOf(shape()),
    }),
    team: shape({
      id: number.isRequired,
    }),
    addedIds: arrayOf(string),
    onAdd: func.isRequired,
  };

  static defaultProps = {
    team: null,
    addedIds: [],
    data: {
      loading: true,
      players: [],
    },
  };

  render() {
    const { data, team, addedIds, onAdd } = this.props;
    if (data.loading) {
      return null;
    }

    const leftToChooseFrom = data.players.filter(p => !addedIds.includes(p.id));

    if (leftToChooseFrom.length === 0) {
      return null;
    }

    return (
      <div>
        <h3 style={{ margin: 0 }}>Spelare kvar att välja på</h3>
        <ul className="playerPicker">
          {leftToChooseFrom.map(player => {
            const photoSrc = player.photo || defaultAvatar;
            return (
              <li
                key={`setup_player_row_${player.id}`}
                onClick={() => onAdd(player, team)}
              >
                <img
                  style={{ width: 20, height: 20 }}
                  src={photoSrc}
                  alt={player.firstName}
                />
                {player.firstName} {player.lastName}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withUserQuery(PlayerPicker);
