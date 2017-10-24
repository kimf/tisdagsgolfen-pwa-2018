import React from 'react'
import { bool, string } from 'prop-types'


const ScorecardHeaderRow = ({ teamEvent, scoring, scoringType }) => {
  const puttsHeader = teamEvent ? null : <span>PUTT</span>
  const beersHeader = teamEvent ? null : <span>ÖL</span>
  const strokes = scoringType === 'strokes'
  return (
    <div className="subheader">
      <span>SPELARE</span>
      {beersHeader}
      <span>{strokes ? 'BRUTTO' : 'SLAG'}</span>
      {puttsHeader}
      {scoring
        ? null
        : <span>{strokes ? 'NETTO' : 'POÄNG'}</span>
      }
    </div>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: bool.isRequired,
  scoring: bool.isRequired,
  scoringType: string.isRequired
}

export default ScorecardHeaderRow
