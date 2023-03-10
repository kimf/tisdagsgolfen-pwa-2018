const initialState = {
  loggedIn: false,
  user: null,
  seasons: [],
  play: {
    course: null,
    teamEvent: false,
    isStrokes: false,
    currentHole: 1,
  },
  activeScoringSession: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN': {
      return {
        ...state,
        loggedIn: true,
      };
    }

    case 'LOGGED_OUT': {
      const user = { email: state.user.email };
      return { ...initialState, user };
    }

    case 'SET_PLAY_VALUE': {
      const { key, value } = action;
      const play = {
        ...state.play,
        [key]: value,
      };
      return { ...state, play };
    }

    case 'CHANGE_CURRENT_HOLE': {
      const { holeNumber } = action;
      const play = {
        ...state.play,
        currentHole: holeNumber,
      };
      return {
        ...state,
        play,
      };
    }

    case 'APOLLO_QUERY_RESULT': {
      if (action.operationName === 'mainQuery') {
        const { data } = action.result;
        const { user, seasons } = data;
        const activeScoringSession = user.scoringSessions[0];
        // delete user.scoringSessions;
        return {
          ...state,
          seasons,
          user,
          activeScoringSession,
        };
      }

      return state;
    }

    case 'APOLLO_MUTATION_RESULT': {
      if (action.operationName === 'cancelRoundMutation') {
        return {
          ...state,
          activeScoringSession: null,
          play: {
            ...initialState.play,
          },
        };
      }

      if (action.operationName === 'finishRoundMutation') {
        return {
          ...state,
          activeScoringSession: null,
          play: {
            ...initialState.play,
          },
        };
      }

      if (action.operationName === 'createScoringSession') {
        const scoringSession = action.result.data.createScoringSession;
        return {
          ...state,
          activeScoringSession: scoringSession,
          play: {
            course: scoringSession.course,
            teamEvent: scoringSession.teamEvent,
            isStrokes: scoringSession.scoringType === 'strokes',
            currentHole: 1,
          },
        };
      }

      return state;
    }

    default:
      return state;
  }
};
