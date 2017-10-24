import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { arrayOf, bool, shape, string, func } from 'prop-types'

const PhotoLink = user => (
  <Link to="/profil">
    <img src={user.photo ? user.photo.url : '/defaultavatar.png'} style={{ height: 30, width: 30 }} alt={user.firstName} />
  </Link>
)

const AdminNav = () => <Link to="/seasons/new">+ NY SÄSONG</Link>

class Header extends Component {
  static propTypes = {
    goBack: bool,
    user: shape({
      firstName: string.isRequired,
      photo: shape({
        url: string.isRequired
      })
    }),
    seasons: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })),
    showPhoto: bool,
    title: string,
    activeScoringSession: shape({
      course: shape({
        id: string.isRequired,
        name: string.isRequired,
        club: string.isRequired
      }).isRequired,
      id: string.isRequired,
      status: string.isRequired,
      scorer: shape({
        id: string.isRequired
      }).isRequired
    }).isRequired,
    history: shape({
      goBack: func
    }).isRequired
  }

  static defaultProps = {
    goBack: false,
    seasons: [],
    showPhoto: false,
    title: null
  }

  render() {
    const {
      user, seasons, title, showPhoto, history, goBack, activeScoringSession
    } = this.props

    return (
      <header className="header">
        {goBack
          ? <span className="back" onClick={e => e.preventDefault && history.goBack()}>↤</span>
          : null
        }
        {showPhoto ? <PhotoLink user={user} /> : null}
        {!title &&
          <span className="seasons">
            {seasons.map(season => <NavLink activeClassName="selected" key={season.id} to={`/${season.name}`}>{season.name}</NavLink>)}
          </span>
        }
        {title && <strong>{title}</strong>}
        <span className="nav">
          {user && user.admin && !title ? <AdminNav /> : null}
          {!title && !activeScoringSession
            ? <Link to="/spela" className="button">▸</Link>
            : null
          }
          {!title && activeScoringSession
            ? <Link to={`/spela/${activeScoringSession.id}`} className="button">▸ FORTSÄTT</Link>
            : null
          }
        </span>
      </header>

    )
  }
}

const mapStateToProps = state => ({ ...state.app })

export default connect(mapStateToProps)(withRouter(Header))
