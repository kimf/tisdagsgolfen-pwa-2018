import React from 'react'
import Tab from './Tab'

const Tabs = ({ currentRoute, seasonName, tabs, bottom }) => {
  const fontSize = bottom ? 16 : 12

  return (
    <div
      style={{
        float: 'left',
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      { tabs.map(tab =>
        <Tab
          key={tab.value}
          tab={tab}
          isCurrent={currentRoute === tab.value}
          fontSize={fontSize}
          seasonName={seasonName}
          padding={bottom ? 12 : 8}
        />
      )}
    </div>
  )
}

const { arrayOf, string, shape, bool } = React.PropTypes

Tabs.propTypes = {
  currentRoute: string.isRequired,
  tabs: arrayOf(shape()).isRequired,
  seasonName: string.isRequired,
  bottom: bool
}

Tabs.defaultProps = {
  bottom: false
}

export default Tabs
