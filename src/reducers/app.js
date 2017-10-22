const initialState = {
  loggedIn: false,
  user: null,
  seasons: [],
  activeScoringSession: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        loggedIn: true
      }
    }

    case 'LOGGED_OUT': {
      const user = { email: state.user.email }
      return { ...initialState, user }
    }

    case 'APOLLO_QUERY_RESULT': {
      if (action.operationName === 'mainQuery') {
        const data = action.result.data
        const user = data.user
        const seasons = data.seasons
        const activeScoringSession = user.scoringSession
        delete user.scoringSession
        return {
          ...state,
          seasons,
          user,
          activeScoringSession
        }
      }

      return state
    }

    case 'APOLLO_MUTATION_RESULT': {
      if (action.operationName === 'cancelRoundMutation') {
        return {
          ...state,
          activeScoringSession: null
        }
      }

      if (action.operationName === 'finishRoundMutation') {
        return {
          ...state,
          activeScoringSession: null
        }
      }

      return state
    }

    default:
      return state
  }
}
