import React, { Component } from 'react';
// import icon from '../images/Soccerball.svg';
import { format } from 'date-fns';
import { teamDetails } from '../data/teams';

class Match extends Component {
  state = { data: null };

  render() {
    const { match } = this.props;
    const { status, utcDate, homeTeam, awayTeam, score } = match;
    const homeTeamShortName = teamDetails[homeTeam.id].shortName;
    const awayTeamShortName = teamDetails[awayTeam.id].shortName;
    // console.log(homeTeam);
    // console.log(teamDetails[homeTeam.id]);
    return (
      <div className="match">
        <div className="home-team">{homeTeamShortName}</div>
        <div className="match-info">
          {status === 'SCHEDULED'
            ? format(new Date(utcDate), 'hh:mm A')
            : `${score.fullTime.homeTeam} - ${score.fullTime.awayTeam}`}
        </div>
        <div className="away-team">{awayTeamShortName}</div>
      </div>
    );
  }
}

export default Match;
