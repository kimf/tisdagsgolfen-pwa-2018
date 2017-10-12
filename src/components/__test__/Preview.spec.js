import React from "react";
import { shallow } from "enzyme";

import { Preview } from "../Preview";

const event = require("./event.json");
const scoringSessions = require("./liveLeaderboard.json").data;
const seasonLeaderboards = require("./seasonLeaderboards.json").data;
const eventLeaderboards = require("./eventLeaderboards.json").data;

const savedScores = require("./savedScores.json");
const createScore = jest.fn(() => null);
savedScores.forEach(score => {
  createScore.mockReturnValueOnce({
    data: { score }
  });
});

const updatedSeasonLeaderboards = require("./updatedSeasonLeaderboards.json");
const updateSeasonLeaderboard = jest.fn(() => null);

const createEventLeaderboard = jest.fn();
const setEventAsFinished = jest.fn();

const props = {
  event,
  seasonId: "cizu2uvsi2anz0150bm8m58yi",
  scoringSessions: {},
  seasonLeaderboards: {},
  eventLeaderboards: {},
  createScore,
  createEventLeaderboard,
  updateSeasonLeaderboard,
  setEventAsFinished
};

test("Button to set scores are there", async () => {
  const component = shallow(<Preview {...props} />);
  component.setProps({
    scoringSessions,
    seasonLeaderboards,
    eventLeaderboards
  });

  expect(component.find("button").length).toBe(1);

  await component.instance().finishRound();

  expect(setEventAsFinished.mock.calls.length).toEqual(1);

  expect(createScore.mock.calls.length).toEqual(4);

  savedScores.forEach((score, index) => {
    expect(createScore.mock.calls[index]).toEqual([
      event.id,
      score.user.id,
      score.value,
      score.eventPoints,
      score.kr,
      score.beers
    ]);
  });

  expect(updateSeasonLeaderboard.mock.calls.length).toEqual(21);
  updatedSeasonLeaderboards.forEach((item, index) => {
    expect(updateSeasonLeaderboard.mock.calls[index]).toEqual([
      updatedSeasonLeaderboards[index].id,
      updatedSeasonLeaderboards[index].position,
      updatedSeasonLeaderboards[index].previousPosition,
      updatedSeasonLeaderboards[index].eventCount,
      updatedSeasonLeaderboards[index].top5Points,
      updatedSeasonLeaderboards[index].totalPoints,
      updatedSeasonLeaderboards[index].averagePoints,
      updatedSeasonLeaderboards[index].totalKr,
      updatedSeasonLeaderboards[index].totalBeers
    ]);
  });

  const createdEventLeaderboards = require("./createdEventLeaderboards.json");
  expect(createEventLeaderboard.mock.calls.length).toEqual(4);
  createdEventLeaderboards.forEach((item, index) => {
    expect(createEventLeaderboard.mock.calls[index]).toEqual([
      event.id,
      createdEventLeaderboards[index].scoreId,
      createdEventLeaderboards[index].position,
      createdEventLeaderboards[index].previousTotalPosition,
      createdEventLeaderboards[index].totalPosition,
      createdEventLeaderboards[index].totalEventCount,
      createdEventLeaderboards[index].totalAveragePoints,
      createdEventLeaderboards[index].totalEventPoints
    ]);
  });
});

/*
expect updateSeasonLeaderboard to be called with correct data
expect createEventLeaderboard to be called with correct data
expect setEventAsFinished to be called with correct id
*/
