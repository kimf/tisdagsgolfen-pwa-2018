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
    const { teamEvent, scoringType } = scoringSession;
    const { scoringId } = this.state;

    return (
      <div className="hole">
        <HoleHeader {...hole} />
        <table>
          <ScorecardHeaderRow
            teamEvent={teamEvent}
            scoringType={scoringType}
            scoring={scoringId !== null}
          />
          <tbody>
            {playing.map(item => {
              const attrWithId = teamEvent ? 'scoringTeam' : 'scoringPlayer';
              const liveScore = hole.liveScores.find(
                ls => ls[attrWithId].id === item.id,
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
                  key={`hole_view_${hole.id}_scoring_${item.id}`}
                  onClick={() =>
                    scoringId ? null : this.toggleScoring(item.id)}
                >
                  {scoringId && scoringId !== item.id ? null : (
                    <UserColumn
                      key={`scoreRow_${item.id}`}
                      teamEvent={teamEvent}
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
                        scoringId: item.id,
                      }}
                    />
                  )}

                  {scoringId !== item.id ? null : (
                    <ScoreInput
                      key={`scoreInput${scoreItem.id}`}
                      scoreItem={scoreItem}
                      playerId={item.id}
                      holeId={hole.id}
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
      </div>
    );
  }
}

export default HoleView;
