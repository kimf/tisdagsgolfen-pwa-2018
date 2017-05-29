import React from 'react'
import { Link } from 'react-router-dom'

const tabStyle = (padding, isCurrent) => ({
  display: 'inline-block',
  paddingTop: padding,
  paddingBottom: padding,
  backgroundColor: isCurrent ? '#D9EEFF' : '#eee',
})

const Tab = ({ tab, isCurrent, seasonName, fontSize, padding }) => {
  const text = `${tab.icon} ${tab.title}`
  const link = `/${seasonName}${tab.value}`
  return (
    <div
      style={tabStyle(padding, isCurrent)}
    >
      <Link to={link} style={{ fontSize, color: isCurrent ? '#222' : '#999' }}>
        {text}
      </Link>
    </div>
  )
}

const { shape, string, bool, number } = React.PropTypes

Tab.propTypes = {
  tab: shape({
    value: string.isRequired,
    icon: string.isRequired,
    title: string.isRequired
  }).isRequired,
  seasonName: string.isRequired,
  isCurrent: bool.isRequired,
  fontSize: number.isRequired,
  padding: number.isRequired
}


export default Tab
