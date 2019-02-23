import React, { Component } from 'react';
import MatchGroupByLeague from './MatchGroupByLeague';

class MatchGroup extends Component {
  state = { data: null };

  render() {
    const { date, matches } = this.props;
    const matchesGroupedByLeague = matches.reduce((acc, match) => {
      const league = match.competition;
      if (acc[league.id]) {
        acc[league.id].push(match);
      } else {
        acc[league.id] = [match];
      }
      return acc;
    }, {});

    return (
      <div className="match-group-date">
        <div className="match-date">{date}</div>
        {Object.keys(matchesGroupedByLeague).map((leagueId) => (
          <MatchGroupByLeague
            key={leagueId}
            matches={matchesGroupedByLeague[leagueId]}
            leagueId={leagueId}
          />
        ))}
      </div>
    );
  }
}

export default MatchGroup;
