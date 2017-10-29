import React from 'react';
import { bool, number, shape } from 'prop-types';

const UserColumn = ({ teamEvent, item, scoreItem }) => {
  const name = teamEvent
    ? item.users.map(p => p.firstName).join(', ')
    : `${item.user.firstName} ${item.user.lastName.substr(0, 1)}`;

  return (
    <td>
      <strong>{name}</strong>
      <br />
      <small>{scoreItem.extraStrokes} extraslag</small>
    </td>
  );
};

UserColumn.propTypes = {
  teamEvent: bool.isRequired,
  item: shape().isRequired,
  scoreItem: shape({
    extraStrokes: number.isRequired,
  }).isRequired,
};

export default UserColumn;
