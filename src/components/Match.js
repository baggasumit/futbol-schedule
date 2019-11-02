import React, { Component } from 'react';
import { format } from 'date-fns';
import { teamDetails } from '../data/teams';
import CrestImage from './CrestImage';

class Match extends Component {
  state = { data: null };

  render() {
    const { match } = this.props;
    const { status, utcDate, homeTeam, awayTeam, score } = match;
    const inPlay = ['IN_PLAY', 'PAUSED'].includes(status);

    const homeTeamShortName =
      (teamDetails[homeTeam.id] && teamDetails[homeTeam.id].shortName) ||
      homeTeam.name;
    const awayTeamShortName =
      (teamDetails[awayTeam.id] && teamDetails[awayTeam.id].shortName) ||
      awayTeam.name;
    const homeCrestUrl =
      teamDetails[homeTeam.id] && teamDetails[homeTeam.id].crestUrl;
    const awayCrestUrl =
      teamDetails[awayTeam.id] && teamDetails[awayTeam.id].crestUrl;

    let matchInfo;
    if (status === 'SCHEDULED') {
      matchInfo = format(new Date(utcDate), 'hh:mm A');
    } else if (['POSTPONED', 'SUSPENDED', 'CANCELLED'].includes(status)) {
      matchInfo = status;
    } else {
      matchInfo = `${score.fullTime.homeTeam} - ${score.fullTime.awayTeam}`;
    }

    return (
      <div className="match">
        <div className="home-team">
          {homeTeamShortName}
          <CrestImage src={homeCrestUrl} />
        </div>
        <div className={'match-info' + (inPlay ? ' in-play' : '')}>
          {matchInfo}
        </div>
        <div className="away-team">
          <CrestImage src={awayCrestUrl} />
          {awayTeamShortName}
        </div>
      </div>
    );
  }
}

export default Match;
