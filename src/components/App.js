import React, { Component } from 'react';
import '../scss/App.scss';
import Matches from './Matches';
import Following from './Following';
// import icon from '../images/Soccerball.svg';
import { Router, Link } from '@reach/router';

class App extends Component {
  state = { favTeams: [5, 61, 64, 65, 66, 81, 86] };

  handleTeamSelect = (event) => {
    const teamId = Number(event.target.id.substring(5));
    const isFav = event.target.checked;
    let favTeams = this.state.favTeams.slice();
    console.log(event.target, teamId, isFav);
    if (isFav) {
      favTeams.push(teamId);
    } else {
      favTeams = favTeams.filter((id) => id !== teamId);
    }
    this.setState({ favTeams });
  };

  render() {
    const { favTeams } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <h1 className="App-title">
              Fútb
              <span
                role="img"
                aria-label="Football emoji"
                className="futbol-emoji"
              >
                ⚽️
              </span>
              l Schedule
            </h1>
          </Link>
          <Link to="/following">Select Teams to Follow</Link>
        </header>
        <Router>
          <Matches path="/" favTeams={favTeams} />
          <Matches path="/matches/:startDate" favTeams={favTeams} />
          <Following
            path="/following"
            favTeams={favTeams}
            handleTeamSelect={this.handleTeamSelect}
          />
        </Router>
      </div>
    );
  }
}

export default App;
