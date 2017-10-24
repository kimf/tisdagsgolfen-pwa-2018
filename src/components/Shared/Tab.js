import React from 'react'
import { shape, string, bool, func } from 'prop-types'


const Tab = ({ tab, isCurrent, onChange }) => {
  const text = `${tab.icon} ${tab.title}`
  return (
    <button
      key={tab.title}
      style={
        {
          color: isCurrent ? 'white' : '#eee',
          fontWeight: isCurrent ? 'bold' : 'normal'
        }
      }
      onClick={() => onChange(tab.value)}
    >
      {text}
    </button>
  )
}

Tab.propTypes = {
  tab: shape({
    value: string.isRequired,
    icon: string.isRequired,
    title: string.isRequired
  }).isRequired,
  isCurrent: bool.isRequired,
  onChange: func.isRequired
}

export default Tab
