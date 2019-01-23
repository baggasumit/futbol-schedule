import React, { Component } from 'react';
import MatchGroupByLeague from './MatchGroupByLeague';

class MatchGroup extends Component {
  state = { data: null };

  render() {
    const { date, matches } = this.props;
    const matchesGroupedByLeague = matches.reduce((acc, match) => {
      const league = match.competition.name;
      // const date = formatDate(match.utcDate, 'MMM DD');
      if (acc[league]) {
        acc[league].push(match);
      } else {
        acc[league] = [match];
      }
      return acc;
    }, {});

    return (
      <div className="match-group-date">
        <div className="match-date">{date}</div>
        {Object.keys(matchesGroupedByLeague).map((league) => (
          <MatchGroupByLeague
            key={league}
            matches={matchesGroupedByLeague[league]}
            league={league}
          />
        ))}
      </div>
    );
  }
}

export default MatchGroup;
