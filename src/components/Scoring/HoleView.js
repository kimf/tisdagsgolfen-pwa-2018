import React, { Component } from 'react';
import { shape, number, arrayOf } from 'prop-types';

import ScoreRow from './ScoreRow';
import ScorecardHeaderRow from './ScorecardHeaderRow';
import ScoreInput from './ScoreInput';
import HoleHeader from './HoleHeader';
import UserColumn from './UserColumn';

import { calculateExtraStrokes } from '../../utils';

class HoleView extends Component {
  static propTypes = {
    hole: shape().isRequired,
    holesCount: number.isRequired,
    playing: arrayOf(shape()).isRequired,
    scoringSession: shape().isRequired,
  };

  state = { scoringId: null };

  toggleScoring = scoringId => {
    this.setState(state => {
      if (state.scoringId) {
        return { scoringId: null };
      }
      return { scoringId };
    });
  };

  render() {
    const { hole, playing, holesCount, scoringSession } = this.props;
    const { teamEvent, scoringType, liveScores } = scoringSession;
    const { scoringId } = this.state;

    return [
      <HoleHeader key={`HoleViewHoleHeader_${hole.id}`} {...hole} />,
      <div className="container" key={`HoleViewContainer_${hole.id}`}>
        <table className="holeTable">
          <ScorecardHeaderRow
            teamEvent={teamEvent}
            scoringType={scoringType}
            scoring={scoringId !== null}
          />
          <tbody>
            {playing.map((item, index) => {
              const userId = teamEvent ? index : item.users[0].id;

              const liveScore = liveScores.find(
                ls => ls.user.id === userId && ls.hole === hole.number,
              );
              const scoreItem = liveScore || {
                strokes: hole.par,
                putts: 2,
                points: 0,
                beers: 0,
                extraStrokes: calculateExtraStrokes(
                  hole.index,
                  item.extraStrokes,
                  holesCount,
                ),
              };

              return (
                <tr
                  key={`hole_view_${hole.id}_scoring_${userId}`}
                  onClick={() =>
                    scoringId ? null : this.toggleScoring(userId)}
                >
                  {scoringId && scoringId !== userId ? null : (
                    <UserColumn
                      key={`scoreRow_${userId}`}
                      item={item}
                      scoreItem={scoreItem}
                    />
                  )}

                  {scoringId ? null : (
                    <ScoreRow
                      key={`scoreRow_${scoreItem.id}`}
                      {...{
                        scoringType,
                        teamEvent,
                        scoreItem,
                        scoringId: userId,
                      }}
                    />
                  )}

                  {scoringId !== userId ? null : (
                    <ScoreInput
                      key={`scoreInput${scoreItem.id}`}
                      scoreItem={scoreItem}
                      playerId={userId}
                      holeNr={hole.number}
                      par={hole.par}
                      teamEvent={teamEvent}
                      onClose={this.toggleScoring}
                      scoringSessionId={scoringSession.id}
                    />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>,
    ];
  }
}

export default HoleView;
