import React, { Component } from 'react';
import { Link } from '@reach/router';
import Match from './Match';
import { leagueData } from '../data/teams';

class MatchGroupByLeague extends Component {
  state = { data: null };

  render() {
    const { leagueId, matches } = this.props;
    const league = leagueData[leagueId];
    return (
      <div className="match-group-league">
        <div className="match-league">{league.name}</div>
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    );
  }
}

export default MatchGroupByLeague;
