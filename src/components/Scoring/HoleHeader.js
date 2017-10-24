import React from 'react'
import { number as numPropType } from 'prop-types'

const HoleHeader = ({ par, number, index }) => (
  <header className="header">
    <span>Par {par}</span>
    <h2 style={{ display: 'inline', margin: '0 20px' }}>{number}</h2>
    <span>Hcp {index}</span>
  </header>
)

HoleHeader.propTypes = {
  par: numPropType.isRequired,
  number: numPropType.isRequired,
  index: numPropType.isRequired
}

export default HoleHeader
