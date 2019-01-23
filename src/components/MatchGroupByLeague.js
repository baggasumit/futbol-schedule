import React, { Component } from 'react';
import Match from './Match';

class MatchGroupByLeague extends Component {
  state = { data: null };

  render() {
    const { league, matches } = this.props;
    return (
      <div className="match-group-league">
        <div className="match-league">{league}</div>
        {matches.map((match) => (
          <Match key={match.id} match={match} />
        ))}
      </div>
    );
  }
}

export default MatchGroupByLeague;
