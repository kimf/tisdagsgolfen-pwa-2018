import { setCache } from '../utils';

const didLoginOrOut = type => ({ type });

export const logout = () => (dispatch, getState) => {
  const { email } = getState();
  setCache('currentUser', { email }).then(() => {
    dispatch(didLoginOrOut('LOGGED_OUT'));
  });
};

export const login = (email, token) => dispatch => {
  setCache('currentUser', { email, token }).then(() => {
    dispatch(didLoginOrOut('LOGGED_IN'));
  });
};

export const setPlayValue = (key, value) => dispatch =>
  dispatch({ type: 'SET_PLAY_VALUE', key, value });

export const changeHole = holeNumber => dispatch =>
  dispatch({ type: 'CHANGE_CURRENT_HOLE', holeNumber });
