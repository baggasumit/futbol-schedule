import React, { Component } from 'react';
import { format as formatDate, addDays } from 'date-fns';
import Spinner from './Spinner';
import MatchGroupByDate from './MatchGroupByDate';
import { Link } from '@reach/router';

// const token = process.env.X_AUTH_TOKEN;
const token = '0c9df6fde4af43f38755d775550be726';

class Matches extends Component {
  state = {
    matches: [],
    loading: true,
    errorMsg: '',
  };

  componentDidMount() {
    this.fetchMatches();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.startDate !== this.props.startDate) {
      this.setState({ loading: true });
      this.fetchMatches();
    }
  }

  fetchMatches = () => {
    const { favTeams } = this.props;
    console.log('props:startDate', this.props.startDate);
    const startDate =
      this.props.startDate || formatDate(new Date(), 'YYYY-MM-DD');
    // const today = formatDate(new Date(), 'YYYY-MM-DD');
    const endDate = formatDate(addDays(startDate, 6), 'YYYY-MM-DD');
    // const url = `http://api.football-data.org/v2/matches?competitions=PL,PD,SA,BL1,CL&dateFrom=${today}&dateTo=${todayPlusSix}`;
    // const url = `http://api.football-data.org/v2/matches?competitions=PL,PD,SA,BL1,CL&dateFrom=2018-10-01&dateTo=2018-10-08`;
    const url = `http://api.football-data.org/v2/matches?competitions=PL,PD,SA,BL1,CL&dateFrom=${startDate}&dateTo=${endDate}`;

    fetch(url, {
      headers: {
        'X-Auth-Token': token,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          let errorMsg = 'Failed to fetch matches from the API.';
          if (response.status === 429) {
            errorMsg = 'Too many requests. Please try again later';
          }
          throw new Error(errorMsg);
        }
        return response.json();
      })
      .then((data) => {
        const filteredMatches = data.matches.filter((match) => {
          // return true;
          return (
            favTeams.includes(match.homeTeam.id) ||
            favTeams.includes(match.awayTeam.id)
          );
        });
        console.log(filteredMatches);
        if (filteredMatches.length === 0) {
          throw new Error(
            'No matches for your followed teams during this time period.'
          );
        }
        const groupedMatches = filteredMatches.reduce((acc, match) => {
          const date = formatDate(match.utcDate, 'dddd - MMM DD');
          if (acc[date]) {
            acc[date].push(match);
          } else {
            acc[date] = [match];
          }
          return acc;
        }, {});

        this.setState({
          matches: groupedMatches,
          loading: false,
          errorMsg: '',
        });
      })
      .catch((error) => {
        // const errorMsg = error.name + ': ' + error.message;
        this.setState({ loading: false, errorMsg: error.message });
        console.log('Fetch error: ' + error);
      });
  };

  calculateStartDate = (days) => {
    return formatDate(
      addDays(this.props.startDate || new Date(), days),
      'YYYY-MM-DD'
    );
  };

  matchesDateRange() {
    const startDate = formatDate(
      this.props.startDate || new Date(),
      'MMM DD, YYYY'
    );
    const endDate = formatDate(addDays(startDate, 6), 'MMM DD, YYYY');
    return `${startDate} - ${endDate}`;
  }

  render() {
    const { matches, loading, errorMsg } = this.state;

    return (
      <div className="matches">
        <h2>Matches</h2>
        <div className="nav-matches">
          <Link to={`/matches/${this.calculateStartDate(-7)}`}>
            &lt; Previous 7 days
          </Link>
          <div>{this.matchesDateRange()}</div>
          <Link to={`/matches/${this.calculateStartDate(7)}`}>
            Next 7 days &gt;
          </Link>
        </div>
        <div className="match-list">
          {loading ? (
            <Spinner />
          ) : errorMsg ? (
            <div>{errorMsg}</div>
          ) : (
            Object.keys(matches).map((date) => (
              <MatchGroupByDate
                key={date}
                date={date}
                matches={matches[date]}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Matches;
