import React from 'react';
import { bool, string } from 'prop-types';

const ScorecardHeaderRow = ({
  leaderboard,
  teamEvent,
  scoring,
  scoringType,
}) => {
  const puttsHeader = teamEvent ? null : <th>PUTT</th>;
  const beersHeader = teamEvent ? null : <th>ÖL</th>;
  const strokes = scoringType === 'strokes';
  return (
    <thead>
      <tr className="subheader">
        {leaderboard ? <th>POS</th> : null}
        <th>SPELARE</th>
        {beersHeader}
        <th>{strokes ? 'BRUTTO' : 'SLAG'}</th>
        {puttsHeader}
        {scoring ? null : <th>{strokes ? 'NETTO' : 'POÄNG'}</th>}
      </tr>
    </thead>
  );
};

ScorecardHeaderRow.propTypes = {
  leaderboard: bool,
  teamEvent: bool.isRequired,
  scoring: bool.isRequired,
  scoringType: string.isRequired,
};

ScorecardHeaderRow.defaultProps = {
  leaderboard: false,
};

export default ScorecardHeaderRow;
