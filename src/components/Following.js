import React, { Component } from 'react';
import { teamList } from '../data/teams';
import { Link } from '@reach/router';

class Following extends Component {
  render() {
    const leagues = ['2021', '2014', '2019', '2002'];
    const { favTeams, handleTeamSelect } = this.props;
    return (
      <>
        <h2>Following</h2>
        <Link to="" onClick={() => window.history.back()}>
          &lt; Back
        </Link>
        <div className="following">
          {leagues.map((leagueId) => {
            const { name, teams } = teamList(leagueId);
            return (
              <div key={leagueId} className="league">
                <div>{name}</div>
                {teams.map((team) => {
                  return (
                    <div key={team.id} className="team">
                      <input
                        id={`team-${team.id}`}
                        type="checkbox"
                        checked={favTeams.includes(team.id)}
                        onChange={handleTeamSelect}
                      />
                      <label htmlFor={`team-${team.id}`}>
                        {team.shortName}
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Following;
