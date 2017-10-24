import React from 'react'
import { bool, string, func } from 'prop-types'

import Tab from './Tab'

const Tabs = ({
  currentRoute, onChange, scoringType, teamEvent
}) => {
  const strokes = scoringType === 'strokes'
  const tabs = [
    { value: 'totalPoints', icon: '🤷', title: strokes ? 'Slag' : 'Poäng' },
    { value: 'beers', icon: '🍻', title: 'Öl' }
  ]

  if (!teamEvent) {
    tabs.push({ value: 'kr', icon: '💸', title: 'Skuld' })
  }

  return (
    <div>
      {
        tabs.map(t => (
          <Tab
            key={`tab_${t.value}`}
            tab={t}
            isCurrent={currentRoute === t.value}
            onChange={onChange}
          />
        ))
      }
    </div>
  )
}

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  teamEvent: bool,
  scoringType: string
}

Tabs.defaultProps = {
  scoringType: 'points',
  teamEvent: false
}

export default Tabs
