import React from 'react';
import { arrayOf, bool, shape, string, number } from 'prop-types';

const getItemName = (teamEvent, player) => {
  if (!teamEvent) {
    return `${player.firstName} ${player.lastName.substr(0, 1)}`;
  }
  return player.users.map(u => u.firstName).join(', ');
};

const ScoringLeaderboardCard = ({
  player,
  sorting,
  scoringType,
  teamEvent,
}) => {
  let pointText;
  let pointValue = '';
  let { position } = player.position;

  const strokePlay = scoringType === 'strokes';

  if (sorting === 'beers') {
    pointValue = player.beers;
    pointText = '🍺';
    position = player.beerPos;
  } else if (sorting === 'kr') {
    pointValue = player.kr - player.kr * 2;
    pointText = 'kr';
    position = player.krPos;
  } else {
    pointValue = strokePlay ? player.calculatedStrokes : player.points;
    pointText = strokePlay ? '' : 'p';
  }

  const itemName = getItemName(teamEvent, player);

  return (
    <li key={player.id}>
      <span>{position}</span>
      {!teamEvent && (
        <img
          width="20"
          height="20"
          src={player.photo || '/defaultavatar.png'}
          alt="user"
        />
      )}
      <span>{itemName}</span>
      {sorting === 'totalPoints' && <span>{player.strokes} slag, </span>}
      <span>{`${pointValue} ${pointText}`}</span>
    </li>
  );
};

ScoringLeaderboardCard.propTypes = {
  player: shape({
    holes: number.isRequired,
    strokes: number.isRequired,
    points: number.isRequired,
    beerPos: number,
    id: string.isRequired,
    krPos: number,
    position: number.isRequired,
    photo: string.isRequired,
    firstName: string,
    lastName: string,
    users: arrayOf(
      shape({
        firstName: string.isRequired,
        lastName: string.isRequired,
      }).isRequired,
    ),
  }).isRequired,
  sorting: string.isRequired,
  scoringType: string.isRequired,
  teamEvent: bool.isRequired,
};

export default ScoringLeaderboardCard;
