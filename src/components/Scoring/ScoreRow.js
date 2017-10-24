// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React from 'react'
import { bool, shape, string } from 'prop-types'

import ScoreItemText from './ScoreItemText'

const ScoreRow = ({ teamEvent, scoreItem, scoringType }) => {
  const strokes = scoringType === 'strokes'
  return [
    teamEvent || !scoreItem.id ? null : <td><ScoreItemText dimmed title={scoreItem.beers} /></td>,
    scoreItem.id
      ? <td><ScoreItemText title={strokes ? scoreItem.strokes : scoreItem.strokes} /></td>
      : null,
    teamEvent || !scoreItem.id ? null : <td><ScoreItemText title={scoreItem.putts} /></td>,
    <td colSpan={scoreItem.id ? 1 : 4}>
      {scoreItem.id
        ? <ScoreItemText
          fontWeight="bold"
          textAlign="right"
          title={strokes ? (scoreItem.strokes - scoreItem.extraStrokes) : scoreItem.points}
        />
        : <small className="muted">TRYCK HÄR</small>
      }
    </td>

  ]
}

ScoreRow.propTypes = {
  teamEvent: bool.isRequired,
  scoreItem: shape().isRequired,
  scoringType: string.isRequired
}

export default ScoreRow
