import {
  buildNewEventLeaderboards,
  buildNewSeasonLeaderboards,
  massageIntoLeaderboard,
  massageTeams,
  massagePlayers,
  playersFromTeamsWithScoreInfo,
  rankBySorting,
  rankedUsers,
  sentIndividualEventPoints,
  setTeamEventPoints,
} from './utils';

/* Team event */
const scoringSessions = require('./components/__test__/liveLeaderboard.json')
  .data.scoringSessions;

test('massageTeams', () => {
  const massagedTeams = [
    {
      holes: 18,
      ...scoringSessions[0].scoringTeams[0],
      points: 48,
      strokes: 75,
    },
    {
      holes: 18,
      ...scoringSessions[0].scoringTeams[1],
      points: 46,
      strokes: 72,
    },
  ];

  expect(massageTeams([...scoringSessions])).toEqual(massagedTeams);
});

test('rankBySorting team + strokes', () => {
  const players = massageIntoLeaderboard(scoringSessions, true);
  const sortedRankedAndMassagedTeams = [
    {
      calculatedStrokes: 60,
      holes: 18,
      ...scoringSessions[0].scoringTeams[0],
      points: 48,
      strokes: 75,
      position: 1,
    },
    {
      calculatedStrokes: 62,
      holes: 18,
      ...scoringSessions[0].scoringTeams[1],
      points: 46,
      strokes: 72,
      position: 2,
    },
  ];

  expect(rankBySorting(players, 'totalPoints', true, 'strokes')).toEqual(
    sortedRankedAndMassagedTeams,
  );
});

test('setTeamEventPoints', () => {
  const players = massageTeams([...scoringSessions]);
  const sortedPlayers = rankBySorting(players, 'totalPoints', true, 'strokes');
  const withPoints = setTeamEventPoints(sortedPlayers);

  expect(withPoints[0].eventPoints).toEqual(25);
  expect(withPoints[1].eventPoints).toEqual(20);
});

test('playersFromTeamsWithScoreInfo', () => {
  const players = massageTeams([...scoringSessions]);
  const sortedPlayers = rankBySorting(players, 'totalPoints', true, 'strokes');
  const withPoints = setTeamEventPoints(sortedPlayers);

  const extractedUsers = [
    {
      calculatedStrokes: 60,
      eventPoints: 25,
      extraStrokes: 15,
      holes: 18,
      id: 'ciyruvmtf8nwl01710gr1zi2j',
      points: 48,
      position: 1,
      strokes: 75,
    },
    {
      calculatedStrokes: 60,
      eventPoints: 25,
      extraStrokes: 15,
      holes: 18,
      id: 'ciyruvnnw4klw0170cn2xbbmw',
      points: 48,
      position: 1,
      strokes: 75,
    },
    {
      calculatedStrokes: 62,
      eventPoints: 20,
      extraStrokes: 10,
      holes: 18,
      id: 'ciyruvmrm8nwf0171qu1l2j6d',
      points: 46,
      position: 2,
      strokes: 72,
    },
    {
      calculatedStrokes: 62,
      eventPoints: 20,
      extraStrokes: 10,
      holes: 18,
      id: 'ciyruvnq14koc0170pkxaov6q',
      points: 46,
      position: 2,
      strokes: 72,
    },
  ];

  expect(playersFromTeamsWithScoreInfo(withPoints)).toEqual(extractedUsers);
});

// Tests to write (and maybe move together with the other ones to its own files)
xtest('massagePlayers', () => {});

xtest('rankBySorting team + points', () => {});
xtest('rankBySorting individual + strokes', () => {});
xtest('rankBySorting individual + points', () => {});
xtest('rankBySorting individual beers', () => {});
xtest('rankBySorting individual kr', () => {});

xtest('setIndividualEventPoints', () => {});
