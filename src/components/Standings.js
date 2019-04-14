import React from 'react';
import Spinner from './Spinner';
import TableRow from './TableRow';
import { leagueData } from '../data/teams';

const token = process.env.REACT_APP_API_TOKEN;

class Standings extends React.Component {
  state = {
    table: [],
    loading: true,
    errorMsg: '',
    selectedLeagueId: this.props.leagueId || 2021,
    // Defaults to Premier League
  };

  componentDidMount() {
    this.fetchStandings();
  }

  fetchStandings = () => {
    const { selectedLeagueId } = this.state;

    const url = `https://api.football-data.org/v2/competitions/${selectedLeagueId}/standings`;

    fetch(url, {
      headers: {
        'X-Auth-Token': token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          let errorMsg = `Failed to fetch standings from the API. Response status: ${
            response.status
          }`;
          if (response.status === 429) {
            errorMsg = 'Too many requests. Please try again later';
          }
          throw new Error(errorMsg);
        }
        return response.json();
      })
      .then((data) => {
        if (data.standings.length === 0) {
          throw new Error('Could not fetch standings at this time!');
        }
        const table = data.standings[0].table;

        this.setState({
          table,
          loading: false,
          errorMsg: '',
        });
      })
      .catch((error) => {
        this.setState({ loading: false, errorMsg: error.message });
        console.log('Fetch error: ' + error);
      });
  };

  renderTableHeader = () => {
    return (
      <div className="header-row table-row">
        <div>Pos</div>
        <div className="team-name">Team</div>
        <div>P</div>
        <div className="only-large">W</div>
        <div className="only-large">D</div>
        <div className="only-large">L</div>
        <div>Pts</div>
      </div>
    );
  };

  handleLeagueSelect = (event) => {
    this.setState(
      { loading: true, selectedLeagueId: event.target.value },
      this.fetchStandings
    );
  };

  render() {
    const { table, loading, errorMsg } = this.state;

    return (
      <div className="standings">
        <select
          className="league-select"
          value={this.state.selectedLeagueId}
          onChange={this.handleLeagueSelect}
        >
          {Object.keys(leagueData).map((leagueId) => {
            const league = leagueData[leagueId];
            return (
              <option value={leagueId} key={leagueId}>
                {league.name}
              </option>
            );
          })}
        </select>
        <div className="table">
          {this.renderTableHeader()}
          {loading ? (
            <Spinner />
          ) : errorMsg ? (
            <div>{errorMsg}</div>
          ) : (
            table.map((row) => {
              return <TableRow row={row} key={row.team.id} />;
            })
          )}
        </div>
      </div>
    );
  }
}

export default Standings;
