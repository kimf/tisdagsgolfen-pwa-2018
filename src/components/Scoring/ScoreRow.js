// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React from 'react'
import { bool, func, shape, string } from 'prop-types'

import ScoreItemText from './ScoreItemText'

const ScoreRow = ({
  teamEvent, scoreItem, scoringType, scoringId, toggleScoring
}) => {
  const strokes = scoringType === 'strokes'
  return (
    <div onClick={() => toggleScoring(scoringId)} className="scoreRow">
      {teamEvent || !scoreItem.id ? null : <ScoreItemText dimmed title={scoreItem.beers} />}
      {scoreItem.id
        ? <ScoreItemText title={strokes ? scoreItem.strokes : scoreItem.strokes} />
        : null
      }
      {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
      {scoreItem.id
        ? <ScoreItemText
          fontWeight="bold"
          textAlign="right"
          title={strokes ? (scoreItem.strokes - scoreItem.extraStrokes) : scoreItem.points}
        />
        : <small>TRYCK HÄR</small>
      }
    </div>
  )
}

ScoreRow.propTypes = {
  teamEvent: bool.isRequired,
  scoreItem: shape().isRequired,
  scoringType: string.isRequired,
  scoringId: string.isRequired,
  toggleScoring: func.isRequired
}

export default ScoreRow
