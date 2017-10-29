// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React from 'react';
import { bool, shape, string } from 'prop-types';

import ScoreItemText from './ScoreItemText';

const ScoreRow = ({ teamEvent, scoreItem, scoringType }) => {
  const strokes = scoringType === 'strokes';
  return [
    teamEvent || !scoreItem.id ? null : (
      <td key={`scoreRow_td_1_${scoreItem.id}`}>
        <ScoreItemText dimmed title={scoreItem.beers} />
      </td>
    ),
    scoreItem.id ? (
      <td key={`scoreRow_td_2_${scoreItem.id}`}>
        <ScoreItemText
          title={strokes ? scoreItem.strokes : scoreItem.strokes}
        />
      </td>
    ) : null,
    teamEvent || !scoreItem.id ? null : (
      <td key={`scoreRow_td_3_${scoreItem.id}`}>
        <ScoreItemText title={scoreItem.putts} />
      </td>
    ),
    <td key={`scoreRow_td_4_${scoreItem.id}`} colSpan={scoreItem.id ? 1 : 4}>
      {scoreItem.id ? (
        <ScoreItemText
          fontWeight="bold"
          textAlign="right"
          title={
            strokes
              ? scoreItem.strokes - scoreItem.extraStrokes
              : scoreItem.points
          }
        />
      ) : (
        <small className="muted">TRYCK HÄR</small>
      )}
    </td>,
  ];
};

ScoreRow.propTypes = {
  teamEvent: bool.isRequired,
  scoreItem: shape().isRequired,
  scoringType: string.isRequired,
};

export default ScoreRow;
