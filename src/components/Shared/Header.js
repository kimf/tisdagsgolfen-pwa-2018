import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { arrayOf, shape, func, string } from 'prop-types'

const Header = ({ user, seasons, onLogout }) => (
  <header>
    <Link to="/">
      <h2>Tisdagsgolfen</h2>
    </Link>
    <span className="nav">
      Hej, {user.firstName}
      <span className="seasons">
        {seasons.map(season => <NavLink activeClassName="selected" key={season.id} to={`/${season.name}`}>{season.name}</NavLink>)}
        {user.admin ? <Link to="/seasons/new" className="button">+ NY SÄSONG</Link> : null}
      </span>
      <a
        href="#logout"
        onClick={(e) => {
          e.preventDefault()
          onLogout(user.email)
        }}
      >
        LOGGA UT
              </a>
    </span>
  </header>
)

Header.propTypes = {
  user: shape({
    firstName: string.isRequired
  }).isRequired,
  seasons: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })),
  onLogout: func.isRequired
}


Header.defaultProps = {
  seasons: []
}


export default Header
