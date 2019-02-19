import React from 'react';
import { teamDetails } from '../data/teams';

class Following extends React.Component {
  render() {
    const { favTeams, removeTeam } = this.props;
    return (
      <div className="following">
        {favTeams.map((teamId) => {
          const { shortName } = teamDetails[teamId];
          return (
            <div key={teamId} className="team">
              {shortName}
              <button onClick={() => removeTeam(teamId)} title="Remove Team">
                &times;
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Following;
