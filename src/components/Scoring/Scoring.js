import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, shape, bool, number } from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { compose } from 'react-apollo'

import { changeHole } from '../../actions/app'

import HoleView from './HoleView'
import Loading from '../Shared/Loading'

import { withScoringSessionQuery } from '../../graphql/queries/scoringSessionQuery'
import { withCancelRoundMutation } from '../../graphql/mutations/cancelRoundMutation'
import { withFinishRoundMutation } from '../../graphql/mutations/finishRoundMutation'

class Scoring extends Component {
  static propTypes = {
    cancelRound: func.isRequired,
    finishRound: func.isRequired,
    data: shape({
      loading: bool,
      scoringSession: shape()
    }).isRequired,
    history: shape().isRequired,
    currentHole: number.isRequired,
    onChangeHole: func.isRequired
  }

  cancelRound = () => {
    const { data, cancelRound, history } = this.props

    const save = async () => {
      try {
        await cancelRound(data.scoringSession.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      history.reset('/')
    }
    save()
  }

  finishRound = () => {
    const { data, finishRound, history } = this.props

    const save = async () => {
      try {
        await finishRound(data.scoringSession.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
      history.reset('/')
    }
    save()
  }

  render() {
    const { data, currentHole, onChangeHole } = this.props
    if (data.loading) {
      return <Loading text="Laddar hål och sånt..." />
    }

    const { scoringSession } = data
    const { teamEvent } = scoringSession
    const playing = teamEvent ? scoringSession.scoringTeams : scoringSession.scoringPlayers
    const holesCount = scoringSession.course.holes.length

    const hole = scoringSession.course.holes.find(h => h.number === currentHole)

    return (
      <div>
        <HoleView
          key={`hole_view_${hole.id}`}
          hole={hole}
          isActive={hole.number === currentHole}
          playing={playing}
          holesCount={holesCount}
          scoringSession={scoringSession}
        />
        <footer>
          {currentHole !== 1
            ? <button onClick={() => onChangeHole(currentHole - 1)}>↤ FÖREG. HÅL</button>
            : null
          }

          <Link className="button" to={`/spela/${scoringSession.id}/ledartavla`}>
            <span role="img" aria-label="scorecard">🗒️</span>
          </Link>

          {currentHole !== holesCount
            ? <button onClick={() => onChangeHole(currentHole + 1)}>NÄSTA HÅL ↦</button>
            : null
          }
        </footer>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  scoringSessionId: state.app.activeScoringSession.id,
  currentHole: state.app.play.currentHole
})

const mapDispatchToProps = dispatch => ({
  onChangeHole: holeNumber => dispatch(changeHole(holeNumber))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withScoringSessionQuery,
  withCancelRoundMutation,
  withFinishRoundMutation,
  withRouter
)(Scoring)
