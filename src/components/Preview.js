import React, { Component, PropTypes } from 'react'
import { compose } from 'react-apollo'

import EventCard from './Season/Events/EventCard'

import {
  average,
  rankedUsers,
  rankBySorting,
  massageIntoLeaderboard,
  setTeamEventPoints,
  setIndividualEventPoints,
  playersFromTeamsWithScoreInfo
} from '../utils'

import withLiveLeaderboardQuery from '../graphql/queries/liveLeaderboardQuery'
import withSeasonLeaderboardsQuery from '../graphql/queries/seasonLeaderboards'
import withEventLeaderboardsQuery from '../graphql/queries/eventLeaderboards'

import withSetEventAsFinishedMutation from '../graphql/mutations/updateEvent'
import withCreateScoreMutation from '../graphql/mutations/createScore'
import withCreateEventLeaderboardMutation
  from '../graphql/mutations/createEventLeaderboard'
import withUpdateSeasonLeaderboardMutation
  from '../graphql/mutations/updateSeasonLeaderboard'

const getItemName = (teamEvent, player) => {
  if (!teamEvent) {
    return `${player.firstName} ${player.lastName.substr(0, 1)}`
  }
  return player.users.map(u => u.firstName).join(', ')
}

class Preview extends Component {
  static propTypes = {
    event: PropTypes.shape().isRequired,
    seasonId: PropTypes.string.isRequired,
    scoringSessions: PropTypes.shape().isRequired,
    seasonLeaderboards: PropTypes.shape().isRequired,
    eventLeaderboards: PropTypes.shape().isRequired,
    createScore: PropTypes.func.isRequired,
    createEventLeaderboard: PropTypes.func.isRequired,
    updateSeasonLeaderboard: PropTypes.func.isRequired,
    setEventAsFinished: PropTypes.func.isRequired
  };

  state = { items: [] };

  componentWillReceiveProps(nextProps) {
    const {
      event,
      scoringSessions,
      seasonLeaderboards,
      eventLeaderboards
    } = nextProps
    if (
      scoringSessions.scoringSessions &&
      scoringSessions.scoringSessions.length > 0 &&
      seasonLeaderboards.seasonLeaderboards &&
      seasonLeaderboards.seasonLeaderboards.length > 0 &&
      eventLeaderboards.eventLeaderboards &&
      eventLeaderboards.eventLeaderboards.length > 0
    ) {
      const players = massageIntoLeaderboard(
        scoringSessions.scoringSessions,
        event.teamEvent
      )

      const sortedPlayers = rankBySorting(
        players,
        'totalPoints',
        event.teamEvent,
        event.scoringType
      )

      const items = event.teamEvent
        ? setTeamEventPoints(sortedPlayers)
        : setIndividualEventPoints(sortedPlayers)

      this.setState(state => ({ ...state, items }))
    }
  }

  finishRound = async () => {
    const {
      event,
      seasonLeaderboards,
      eventLeaderboards,
      createScore,
      createEventLeaderboard,
      updateSeasonLeaderboard,
      setEventAsFinished
    } = this.props
    const { items } = this.state

    let users = []
    if (event.teamEvent) {
      // users = [].concat(...items.map(item => item.users))
      users = playersFromTeamsWithScoreInfo(items)
    } else {
      users = items
    }

    const scores = []
    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      const value = event.scoringType === 'strokes'
        ? user.calculatedStrokes
        : user.points

      scores.push(
        createScore(
          event.id,
          user.id,
          parseInt(value, 10) || 0,
          parseInt(user.eventPoints, 10) || 0,
          parseInt(user.earnings, 10) || 0,
          parseInt(user.beers, 10) || 0
        )
      )
    }

    const savedScoresData = await Promise.all(scores)

    const savedScores = savedScoresData.map(ssd => ssd.data.score)

    // create local eventLeaderboards for all the saved scores, and prepare them
    const newEventLeaderboards = []
    savedScores.forEach((score) => {
      const user = users.find(u => u.id === score.user.id)
      const seasonLeaderboard = seasonLeaderboards.seasonLeaderboards.find(
        sl => sl.user.id === user.id
      )

      newEventLeaderboards.push({
        userId: user.id,
        scoreId: score.id,
        position: user.position,
        previousTotalPosition: seasonLeaderboard.position
      })
    })

    // take all seasonLeaderboards, add local info and rank them
    const newSeasonLeaderboards = []
    seasonLeaderboards.seasonLeaderboards.forEach((sl) => {
      const score = savedScores.find(ss => ss.user.id === sl.user.id)
      if (score) {
        const eventPointsArray = eventLeaderboards.eventLeaderboards
          .filter(el => el.score.user.id === score.user.id)
          .map(uel => uel.score.eventPoints)

        const averagePoints = average([...eventPointsArray, score.eventPoints])

        const top5Points = [...sl.top5Points, score.eventPoints]
          .sort((a, b) => a - b)
          .reverse()
          .slice(0, 5)

        const totalPoints = top5Points.reduce((a, b) => a + b, 0)

        const totalKr = sl.totalKr + score.kr
        const totalBeers = sl.totalBeers + score.beers
        const userId = score.user.id

        const newSl = {
          ...sl,
          top5Points,
          eventCount: sl.eventCount + 1,
          previousPosition: sl.position,
          totalPoints,
          averagePoints,
          totalKr,
          totalBeers,
          userId
        }

        newSeasonLeaderboards.push(newSl)
      }
      newSeasonLeaderboards.push({
        ...sl,
        previousPosition: sl.position
      })
    })

    // re-rank seasonLeaderboards with new data
    const reRankedSeasonLeaderboards = rankedUsers(newSeasonLeaderboards)
    const promises = []
    reRankedSeasonLeaderboards.forEach((reranked) => {
      promises.push(
        updateSeasonLeaderboard(
          reranked.id,
          reranked.position,
          reranked.previousPosition,
          reranked.eventCount,
          reranked.top5Points,
          reranked.totalPoints,
          reranked.averagePoints,
          reranked.totalKr,
          reranked.totalBeers
        )
      )
    })

    // add info to tmp eventLeaderboards and create them
    newEventLeaderboards.forEach((nel) => {
      const updatedSeasonLeaderboard = reRankedSeasonLeaderboards.find(
        rrsl => rrsl.userId === nel.userId
      )
      promises.push(
        createEventLeaderboard(
          event.id,
          nel.scoreId,
          nel.position,
          nel.previousTotalPosition,
          updatedSeasonLeaderboard.position,
          updatedSeasonLeaderboard.eventCount,
          updatedSeasonLeaderboard.averagePoints,
          updatedSeasonLeaderboard.totalPoints
        )
      )
    })

    await Promise.all(promises)

    await setEventAsFinished(event.id)

    // eslint-disable-next-line no-alert
    window.alert('KLAAAR!')
  };

  render() {
    const {
      event,
      seasonId,
      eventLeaderboards,
      scoringSessions,
      seasonLeaderboards
    } = this.props

    const { items } = this.state

    if (
      eventLeaderboards.loading ||
      scoringSessions.loading ||
      seasonLeaderboards.loading ||
      items.length === 0
    ) {
      return null
    }

    return (
      <div>
        <ul>
          <EventCard seasonId={seasonId} event={event} isUsedAsHeader />
        </ul>
        <table cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              <th />
              <th>Spelare</th>
              <th>🍺</th>
              <th>Kr</th>
              <th>Brutto</th>
              <th>Netto</th>
              <th>Poäng</th>
              <th>EventPoints</th>
            </tr>
          </thead>
          <tbody>
            {items.map((player) => {
              const itemName = getItemName(event.teamEvent, player)

              return (
                <tr key={player.id}>
                  <td>{player.position}</td>
                  <td style={{ width: '200px' }}>{itemName}</td>
                  <td>{player.beers || 0}</td>
                  <td>{player.earnings || 0}</td>
                  <td>{player.strokes}</td>
                  <td>{player.calculatedStrokes}</td>
                  <td>{player.points}</td>
                  <td>{player.eventPoints}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <button onClick={this.finishRound}>
          SER BRA UT!
        </button>
      </div>
    )
  }
}

export default compose(
  withSeasonLeaderboardsQuery,
  withEventLeaderboardsQuery,
  withLiveLeaderboardQuery,
  withCreateScoreMutation,
  withUpdateSeasonLeaderboardMutation,
  withCreateEventLeaderboardMutation,
  withSetEventAsFinishedMutation
)(Preview)
