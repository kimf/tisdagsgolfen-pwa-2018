import React, { Component } from "react";
import { string, shape, func } from "prop-types";

import { compose } from "react-apollo";

import EventCard from "./Season/Events/EventCard";

import {
  average,
  rankedUsers,
  rankBySorting,
  massageIntoLeaderboard,
  setTeamEventPoints,
  setIndividualEventPoints,
  playersFromTeamsWithScoreInfo,
  buildNewEventLeaderboards,
  buildNewSeasonLeaderboards
} from "../utils";

import withLiveLeaderboardQuery from "../graphql/queries/liveLeaderboardQuery";
import withSeasonLeaderboardsQuery from "../graphql/queries/seasonLeaderboards";
import withEventLeaderboardsQuery from "../graphql/queries/eventLeaderboards";

import withSetEventAsFinishedMutation from "../graphql/mutations/updateEvent";
import withCreateScoreMutation from "../graphql/mutations/createScore";
import withCreateEventLeaderboardMutation
  from "../graphql/mutations/createEventLeaderboard";
import withUpdateSeasonLeaderboardMutation
  from "../graphql/mutations/updateSeasonLeaderboard";

const getItemName = (teamEvent, player) => {
  if (!teamEvent) {
    return `${player.firstName} ${player.lastName.substr(0, 1)}`;
  }
  return player.users.map(u => u.firstName).join(", ");
};

export class Preview extends Component {
  static propTypes = {
    event: shape().isRequired,
    seasonId: string.isRequired,
    scoringSessions: shape().isRequired,
    seasonLeaderboards: shape().isRequired,
    eventLeaderboards: shape().isRequired,
    createScore: func.isRequired,
    createEventLeaderboard: func.isRequired,
    updateSeasonLeaderboard: func.isRequired,
    setEventAsFinished: func.isRequired
  };

  state = { items: [] };

  componentWillReceiveProps(nextProps) {
    const {
      event,
      scoringSessions,
      seasonLeaderboards,
      eventLeaderboards
    } = nextProps;
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
      );

      const sortedPlayers = rankBySorting(
        players,
        "totalPoints",
        event.teamEvent,
        event.scoringType
      );

      const items = event.teamEvent
        ? setTeamEventPoints(sortedPlayers)
        : setIndividualEventPoints(sortedPlayers);

      this.setState(state => ({ ...state, items }));
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
    } = this.props;
    const { items } = this.state;

    let users = [];
    if (event.teamEvent) {
      // users = [].concat(...items.map(item => item.users))
      users = playersFromTeamsWithScoreInfo(items);
    } else {
      users = items;
    }

    const scores = [];
    users.forEach(user => {
      const value = event.scoringType === "strokes"
        ? user.calculatedStrokes
        : user.points;

      scores.push(
        createScore(
          event.id,
          user.id,
          parseInt(value, 10) || 0,
          parseInt(user.eventPoints, 10) || 0,
          parseInt(user.earnings, 10) || 0,
          parseInt(user.beers, 10) || 0
        )
      );
    });

    const savedScoresData = await Promise.all(scores);

    const savedScores = savedScoresData.map(ssd => ssd.data.score);

    // create local eventLeaderboards for all the saved scores, and prepare them
    const newEventLeaderboards = buildNewEventLeaderboards(
      savedScores,
      users,
      seasonLeaderboards
    );

    // take all seasonLeaderboards, add local info and rank them
    const newSeasonLeaderboards = buildNewSeasonLeaderboards(
      seasonLeaderboards,
      eventLeaderboards,
      savedScores
    );

    // re-rank seasonLeaderboards with new data
    const reRankedSeasonLeaderboards = rankedUsers(newSeasonLeaderboards);
    const promises = [];

    reRankedSeasonLeaderboards.forEach(reranked => {
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
      );

      // add info to tmp eventLeaderboard and create them
      const newEventLeaderboard = newEventLeaderboards.find(
        nel => nel.userId === reranked.userId
      );
      if (newEventLeaderboard) {
        promises.push(
          createEventLeaderboard(
            event.id,
            newEventLeaderboard.scoreId,
            newEventLeaderboard.position,
            newEventLeaderboard.previousTotalPosition,
            reranked.position,
            reranked.eventCount,
            reranked.averagePoints,
            reranked.totalPoints
          )
        );
      }
    });

    await Promise.all(promises);

    await setEventAsFinished(event.id);

    // eslint-disable-next-line no-alert
    window.alert("KLAAAR!");
  };

  render() {
    const {
      event,
      seasonId,
      eventLeaderboards,
      scoringSessions,
      seasonLeaderboards
    } = this.props;

    const { items } = this.state;

    if (items.length === 0) {
      return null;
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
            {items.map(player => {
              const itemName = getItemName(event.teamEvent, player);

              return (
                <tr key={player.id}>
                  <td>{player.position}</td>
                  <td style={{ width: "200px" }}>{itemName}</td>
                  <td>{player.beers || 0}</td>
                  <td>{player.earnings || 0}</td>
                  <td>{player.strokes}</td>
                  <td>{player.calculatedStrokes}</td>
                  <td>{player.points}</td>
                  <td>{player.eventPoints}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <button onClick={this.finishRound}>
          SER BRA UT!
        </button>
      </div>
    );
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
)(Preview);
