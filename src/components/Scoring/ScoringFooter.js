import React from 'react'
import { func } from 'prop-types'

const ScoringFooter = ({ showMenu, showLeaderboard }) => (
  <footer>
    <span onPress={() => showMenu()}>
      MENY
    </span>
    <span onPress={() => showLeaderboard()}>
      LEDARTAVLA
    </span>
  </footer>
)

ScoringFooter.propTypes = {
  showMenu: func.isRequired,
  showLeaderboard: func.isRequired
}

export default ScoringFooter
