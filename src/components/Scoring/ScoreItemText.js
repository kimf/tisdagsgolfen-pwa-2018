import React from 'react';
import { oneOfType, string, number, bool } from 'prop-types';

const ScoreItemText = ({ title, dimmed }) => (
  <span className={`scoreItemText ${dimmed && 'dimmed'}`}>{`${title}`}</span>
);

ScoreItemText.propTypes = {
  title: oneOfType([string, number]).isRequired,
  dimmed: bool,
};

ScoreItemText.defaultProps = {
  dimmed: false,
};

export default ScoreItemText;
