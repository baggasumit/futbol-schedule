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

    return (
      <div className="match">
        <div className="home-team">
          {homeTeamShortName}
          <img className="club-crest" src={homeCrestUrl} alt="Club Crest" />
        </div>
        <div className="match-info">
          {status === 'SCHEDULED'
            ? format(new Date(utcDate), 'hh:mm A')
            : `${score.fullTime.homeTeam} - ${score.fullTime.awayTeam}`}
        </div>
        <div className="away-team">
          <img className="club-crest" src={awayCrestUrl} alt="Club Crest" />
          {awayTeamShortName}
        </div>
      </div>
    );
  }
}

export default Match;
