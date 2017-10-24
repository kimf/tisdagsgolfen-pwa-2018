export const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length
// avg.toLocaleString('sv', {maximumFractionDigits: 1, useGrouping:false})

export const sorted = (array, attribute) =>
  array.sort((a, b) => b[attribute] - a[attribute])

export const sortedByParsedDate = (array, attribute) =>
  sorted(
    array.map((item) => {
      const date = new Date(item[attribute])
      const newItem = Object.assign({}, item)
      newItem[attribute] = date
      return newItem
    }),
    attribute
  )

// ranked :: Array -> String -> Array
export const ranked = (array, attribute, rankingAttribute, reversed) => {
  const scores = array.map(x => x[rankingAttribute])
  const rankedArr = array.map((item) => {
    const newItem = Object.assign({}, item)
    newItem[attribute] = scores.indexOf(newItem[rankingAttribute]) + 1
    return newItem
  })

  return reversed ? rankedArr.reverse() : rankedArr
}

const cmp = (a, b) => {
  if (a > b) return +1
  if (a < b) return -1
  return 0
}

export const rankedUsers = (realUsers) => {
  const rankings = []
  const users = realUsers.slice()
  users.sort((a, b) => cmp(a.totalPoints, b.totalPoints) || cmp(a.average, b.average))

  users.reverse().forEach((user, i) => {
    const rankedUser = Object.assign({}, user)
    if (i === 0) {
      rankedUser.position = 1
    } else if (rankedUser.totalPoints === users[i - 1].totalPoints) {
      if (rankedUser.average === users[i - 1].average) {
        rankedUser.position = rankings[i - 1].position
      } else {
        rankedUser.position = i + 1
        rankings[i] = rankedUser
      }
    } else {
      rankedUser.position = i + 1
    }
    rankings[i] = rankedUser
  })
  return rankings
}

export const setCache = async (key, val) => {
  try {
    const item = JSON.stringify(val)
    const value = await window.localStorage.setItem(key, item)
    if (value === null) {
      return false
    }
    return value
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in setCache', e)
    return false
  }
}

export const getCache = async (key) => {
  try {
    const value = await window.localStorage.getItem(key)
    return JSON.parse(value)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e)
    return null
  }
}

export const removeCache = async (key) => {
  try {
    await window.localStorage.removeItem(key)
    return null
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e)
    return null
  }
}

export const STROKES_MONEY = {
  [-4]: 500,
  [-3]: 300,
  [-2]: 100,
  [-1]: 10
}

export const PUTT_MONEY = {
  3: -10,
  4: -20,
  5: -30,
  6: -50,
  7: -75,
  8: -100,
  9: -125,
  10: -150,
  11: -175
}

export const calculateEarnings = (putts, strokes, par) => {
  let earnings = 0

  if (putts > 2) {
    earnings += PUTT_MONEY[putts]
  }

  if (strokes === 1) {
    earnings += 500
  }

  const strokesOverPar = strokes - par
  if (strokesOverPar < 0) {
    earnings += STROKES_MONEY[strokesOverPar]
  }

  return earnings
}

export const massageTeams = (scoringSessions) => {
  const teams = []
  scoringSessions.forEach((scoringSession) => {
    scoringSession.scoringTeams.forEach((team) => {
      const holes = team.liveScores.length
      let strokes = 0
      let points = 0

      team.liveScores.forEach((ls) => {
        strokes += ls.strokes
        points += ls.points
      })

      const teamItem = {
        ...team,
        holes,
        strokes,
        points
      }
      teams.push(teamItem)
    })
  })

  return teams
}

export const massagePlayers = (scoringSessions) => {
  const players = []
  scoringSessions.forEach((scoringSession) => {
    scoringSession.scoringPlayers.forEach((player) => {
      const holes = player.liveScores.length
      let beers = 0
      let kr = 0
      let points = 0
      let putts = 0
      let strokes = 0

      player.liveScores.forEach((ls) => {
        beers += ls.beers
        kr += calculateEarnings(ls.putts, ls.strokes, ls.hole.par)
        points += ls.points
        putts += ls.putts
        strokes += ls.strokes
      })

      const playerItem = {
        ...player.user,
        beers,
        kr,
        points,
        putts,
        strokes,
        holes,
        beerPos: 0,
        krPos: 0,
        position: 0
      }
      players.push(playerItem)
    })
  })

  return players
}

export const massageIntoLeaderboard = (scoringSessions, teamEvent) => {
  let items = []
  if (teamEvent) {
    items = massageTeams(scoringSessions)
  } else {
    items = massagePlayers(scoringSessions)
  }
  return items
}

const addCalculatedStrokes = p => ({
  ...p,
  calculatedStrokes: p.strokes - p.extraStrokes
})

export const rankBySorting = (players, sorting, teamEvent, scoringType) => {
  if (sorting === 'beers' || sorting === 'kr') {
    // const items = teamEvent ? breakOutTeamPlayers(players) : players
    const sortedBySorting = players
      .slice()
      .sort((a, b) => b[sorting] - a[sorting])
    return ranked(
      sortedBySorting,
      sorting === 'beers' ? 'beerPos' : 'krPos',
      sorting
    )
  }

  const isStrokePlay = scoringType === 'strokes'

  const sortedPlayers = isStrokePlay
    ? players
      .map(addCalculatedStrokes)
      .sort((a, b) => a.calculatedStrokes - b.calculatedStrokes)
    : players.slice().sort((a, b) => b.points - a.points)

  const sortKey = isStrokePlay ? 'calculatedStrokes' : 'points'
  return ranked(sortedPlayers, 'position', sortKey, isStrokePlay)
}

const seasonPointsArray = (length) => {
  const points = [25, 20, 15, 10, 8, 6, 4, 2]
  if (points.length < length) {
    const zeroPaddedPoints = points
    return Array.from(Array(length - points.length)).forEach(() =>
      zeroPaddedPoints.push(0))
  }

  return points
}

export const setIndividualEventPoints = rankedScores => rankedScores

export const setTeamEventPoints = (rankedScores) => {
  const pointsArray = seasonPointsArray(rankedScores.length)
  pointsArray.forEach((p, i) => {
    const hasSamePosition = rankedScores.filter(rs => rs.position === i + 1)

    if (hasSamePosition.length === 1) {
      const item = rankedScores.find(rs => rs.id === hasSamePosition[0].id)
      item.eventPoints = p
    } else if (hasSamePosition > 1) {
      hasSamePosition.forEach((item, index) => {
        const firstIndex = item.position - 1
        const lastIndex = firstIndex + hasSamePosition.length

        const pointsToWorkWith = pointsArray.slice(firstIndex, lastIndex)
        const pointSum = pointsToWorkWith.reduce(
          (prev, cur) => parseFloat(prev) + parseFloat(cur),
          0.0
        )

        const splitPointSum = pointSum / hasSamePosition.length
        const multipledWithTwo = splitPointSum * 2

        const item2 = rankedScores.find(rs => rs.id === hasSamePosition[index].id)
        item2.eventPoints = Math.round(multipledWithTwo / 2.0)
      })
    }
  })

  return rankedScores
}

export const playersFromTeamsWithScoreInfo = (teams) => {
  const users = []
  teams.forEach((team) => {
    const teamData = { ...team }
    delete teamData.users
    delete teamData.liveScores

    team.users.forEach((user) => {
      users.push({
        ...teamData,
        id: user.id
      })
    })
  })

  return users
}

export const buildNewEventLeaderboards = (
  savedScores,
  users,
  seasonLeaderboards
) => {
  const newEventLeaderboards = []
  savedScores.forEach((score) => {
    const user = users.find(u => u.id === score.user.id)
    const seasonLeaderboard = seasonLeaderboards.seasonLeaderboards.find(sl => sl.user.id === user.id)

    newEventLeaderboards.push({
      userId: user.id,
      scoreId: score.id,
      position: user.position,
      previousTotalPosition: seasonLeaderboard.position
    })
  })

  return newEventLeaderboards
}

export const buildNewSeasonLeaderboards = (
  seasonLeaderboards,
  eventLeaderboards,
  savedScores
) => {
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
    } else {
      newSeasonLeaderboards.push({
        ...sl,
        previousPosition: sl.position
      })
    }
  })

  return newSeasonLeaderboards
}


export const cacheable = (fn) => {
  /* May store args and result on fn like this:
   * fn.lastArgs = ...
   * fn.lastResult = ...
   */
  let lastArgs = []
  let lastResult = null

  const eq = (args1, args2) => {
    if (!args1 || !args2 || args1.length !== args2.length) return false
    return args1.every((arg, index) => arg === args2[index])
  }

  return (...args) => {
    if (eq(args, lastArgs)) {
      // eslint-disable-next-line no-console
      console.log(`> from cache - ${fn.name}`)
      return lastResult
    }

    const result = fn(...args)
    lastArgs = args
    lastResult = result
    return result
  }
}


export const calculateExtraStrokes = (holeIndex, playerStrokes, holesCount) => {
  let extra = 0
  if (holeIndex <= playerStrokes) {
    extra = 1
    if (playerStrokes > holesCount) {
      if (holeIndex <= (playerStrokes - holesCount)) {
        extra = 2
      }
    }
  }
  return extra
}
