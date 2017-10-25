import React, { Component } from 'react';
import { bool, shape, number, string, func, oneOfType } from 'prop-types';
import { compose } from 'react-apollo';
import Picker from 'react-mobile-picker';

import {
  pointsArray,
  STROKE_VALUES,
  PUTT_VALUES,
  BEER_VALUES,
} from './constants';
import { withCreateLiveScoreMutation } from '../../graphql/mutations/createLiveScoreMutation';
import { withUpdateLiveScoreMutation } from '../../graphql/mutations/updateLiveScoreMutation';

const optionGroups = {
  beers: BEER_VALUES,
  strokes: STROKE_VALUES,
  putts: PUTT_VALUES,
};

class ScoreInput extends Component {
  static propTypes = {
    holeId: string.isRequired,
    playerId: string.isRequired,
    scoringSessionId: string.isRequired,
    par: number.isRequired,
    teamEvent: bool.isRequired,
    scoreItem: oneOfType([
      bool,
      shape({
        beers: number.isRequired,
        strokes: number.isRequired,
        putts: number.isRequired,
        extraStrokes: number.isRequired,
      }),
    ]).isRequired,
    createLiveScore: func.isRequired,
    updateLiveScore: func.isRequired,
    onClose: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      valueGroups: {
        beers: props.scoreItem.beers || 0,
        strokes: props.scoreItem.strokes || props.par,
        putts: props.scoreItem.putts || 2,
      },
    };
  }

  onCloseScoreForm = () => {
    const {
      holeId,
      par,
      teamEvent,
      playerId,
      scoringSessionId,
      createLiveScore,
      updateLiveScore,
    } = this.props;
    const { extraStrokes } = this.props.scoreItem;
    const { beers, strokes, putts } = this.state.valueGroups;
    const newScoreItem = {
      ...this.props.scoreItem,
      beers,
      strokes,
      putts,
    };

    const playingId = teamEvent
      ? { scoringTeamId: playerId }
      : { scoringPlayerId: playerId };
    const ids = {
      holeId,
      scoringSessionId,
      ...playingId,
    };

    if (putts > strokes) {
      // eslint-disable-next-line
      alert('Du verkar ha angett fler puttar än slag!');
    } else {
      const strokeSum = strokes - extraStrokes;
      const testSum = strokeSum - par;
      newScoreItem.points = parseInt(pointsArray[testSum], 10);
      newScoreItem.inFlight = true;

      const save = async () => {
        try {
          if (newScoreItem.id) {
            await updateLiveScore(newScoreItem);
          } else {
            await createLiveScore(ids, newScoreItem);
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }

        this.props.onClose();
      };

      save();
    }
  };

  handleChange = (name, value) => {
    this.setState(state => ({
      ...state,
      valueGroups: {
        ...state.valueGroups,
        [name]: value,
      },
    }));
  };

  render() {
    // const { teamEvent } = this.props
    const { valueGroups } = this.state;
    // TODO: Göm puttar + öl för Lagevents, och fnula ut hur göra med öl för lag
    return (
      <td colSpan="3">
        <Picker
          optionGroups={optionGroups}
          valueGroups={valueGroups}
          onChange={this.handleChange}
        />
        <button onClick={this.onCloseScoreForm}>SPARA</button>
      </td>
    );
  }
}

export default compose(
  withCreateLiveScoreMutation,
  withUpdateLiveScoreMutation,
)(ScoreInput);
