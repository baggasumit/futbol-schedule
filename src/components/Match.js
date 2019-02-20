import React, { Component } from 'react';
import BlankCrest from '../images/BlankCrest.jpg';
import { format } from 'date-fns';
import { teamDetails } from '../data/teams';

class Match extends Component {
  state = { data: null };

  render() {
    const { match } = this.props;
    const { status, utcDate, homeTeam, awayTeam, score } = match;
    const homeTeamShortName = teamDetails[homeTeam.id].shortName;
    const awayTeamShortName = teamDetails[awayTeam.id].shortName;
    const homeCrestUrl = teamDetails[homeTeam.id].crestUrl || BlankCrest;
    const awayCrestUrl = teamDetails[awayTeam.id].crestUrl || BlankCrest;
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
          <img className="club-crest" src={homeCrestUrl} alt="Club Crest" />
        </div>
        <div className="match-info">{matchInfo}</div>
        <div className="away-team">
          <img className="club-crest" src={awayCrestUrl} alt="Club Crest" />
          {awayTeamShortName}
        </div>
      </div>
    );
  }
}

export default Match;
