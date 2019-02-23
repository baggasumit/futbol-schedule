import React from 'react';
import { Link } from '@reach/router';
import Spinner from './Spinner';
import TableRow from './TableRow';
import { leagueData } from '../data/teams';

// const token = process.env.X_AUTH_TOKEN;
const token = '0c9df6fde4af43f38755d775550be726';

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
        const table = data.standings[0].table;
        // console.log(table);

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
        <div>W</div>
        <div>D</div>
        <div>L</div>
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
    const league = leagueData[this.props.leagueId];

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
