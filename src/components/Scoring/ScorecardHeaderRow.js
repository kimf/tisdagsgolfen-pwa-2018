import React from 'react'
import { bool, string } from 'prop-types'


const ScorecardHeaderRow = ({ teamEvent, scoring, scoringType }) => {
  const puttsHeader = teamEvent ? null : <th>PUTT</th>
  const beersHeader = teamEvent ? null : <th>ÖL</th>
  const strokes = scoringType === 'strokes'
  return (
    <thead>
      <tr className="subheader">
        <th>SPELARE</th>
        {beersHeader}
        <th>{strokes ? 'BRUTTO' : 'SLAG'}</th>
        {puttsHeader}
        {scoring
          ? null
          : <th>{strokes ? 'NETTO' : 'POÄNG'}</th>
        }
      </tr>
    </thead>
  )
}

ScorecardHeaderRow.propTypes = {
  teamEvent: bool.isRequired,
  scoring: bool.isRequired,
  scoringType: string.isRequired
}

export default ScorecardHeaderRow
