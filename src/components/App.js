import React, { Component } from 'react';
import { Router } from '@reach/router';

import Matches from './Matches';
import Following from './Following';
import AutoComplete from './AutoComplete';
import Header from './Header';
import { teamDetails } from '../data/teams';

class App extends Component {
  constructor(props) {
    super(props);
    const defaultTeams = [
      66,
      65,
      61,
      64,
      57,
      73,
      109,
      113,
      100,
      5,
      4,
      86,
      81,
      78,
    ];
    // Default teams: Manchester United, Manchester City, Chelsea, Liverpool, Arsenal, Tottenham, Juventus, Napoli, Roma, Bayern Munich, Dortmund, Real Madrid, Barcelona, Atletico Madrid
    // If the user is coming to the app for the first time, populate the state with default teams
    const favTeamsLocalStorage = localStorage.getItem('favTeams');
    const favTeams = favTeamsLocalStorage
      ? JSON.parse(favTeamsLocalStorage)
      : defaultTeams;

    this.state = { favTeams };
  }

  addTeam = (teamId) => {
    let favTeams = this.state.favTeams.slice();
    if (!favTeams.includes(teamId)) {
      favTeams.push(teamId);
      this.setState({ favTeams });
      localStorage.setItem('favTeams', JSON.stringify(favTeams));
    }
  };

  removeTeam = (teamId) => {
    let favTeams = this.state.favTeams.slice();
    let updatedFavTeams = favTeams.filter((id) => id !== teamId);
    this.setState({ favTeams: updatedFavTeams });
    localStorage.setItem('favTeams', JSON.stringify(updatedFavTeams));
  };

  render() {
    const { favTeams } = this.state;
    return (
      <div className="App">
        <Header />
        <div className="main">
          <AutoComplete
            teams={Object.entries(teamDetails)}
            addTeam={this.addTeam}
          />
          <Following favTeams={favTeams} removeTeam={this.removeTeam} />
          <Router>
            <Matches path="/" favTeams={favTeams} />
            <Matches path="/matches/:startDate" favTeams={favTeams} />
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
