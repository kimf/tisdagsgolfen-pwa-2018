import React from 'react';
import { number, shape } from 'prop-types';

const UserColumn = ({ item, scoreItem }) => {
  const name = item.users.map(p => p.firstName).join(', ');
  return (
    <td>
      <strong>{name}</strong>
      <br />
      <small>{scoreItem.extraStrokes} extraslag</small>
    </td>
  );
};

UserColumn.propTypes = {
  item: shape().isRequired,
  scoreItem: shape({
    extraStrokes: number.isRequired,
  }).isRequired,
};

export default UserColumn;
