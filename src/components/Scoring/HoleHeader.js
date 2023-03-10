import React from 'react';
import { number as numPropType } from 'prop-types';

const HoleHeader = ({ par, number, index }) => (
  <header className="holeHeader" style={{ display: 'flex' }}>
    <span style={{ flex: 1, textAlign: 'left' }}>Par {par}</span>
    <h2 style={{ flex: 1, textAlign: 'center', fontSize: '2em' }}>{number}</h2>
    <span style={{ flex: 1, textAlign: 'right' }}>Hcp {index}</span>
  </header>
);

HoleHeader.propTypes = {
  par: numPropType.isRequired,
  number: numPropType.isRequired,
  index: numPropType.isRequired,
};

export default HoleHeader;
