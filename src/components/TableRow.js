import React from 'react';
import CrestImage from './CrestImage';

function TableRow(props) {
  const { row } = props;
  const {
    position,
    team: { name, crestUrl },
    playedGames,
    won,
    draw,
    lost,
    points,
  } = row;
  return (
    <div className="table-row">
      <div>{position}</div>
      <div className="team-name">
        <CrestImage src={crestUrl} />
        {name}
      </div>
      <div>{playedGames}</div>
      <div className="only-large">{won}</div>
      <div className="only-large">{draw}</div>
      <div className="only-large">{lost}</div>
      <div>{points}</div>
    </div>
  );
}

/*
{
  "position": 1,
  "team": {
      "id": 65,
      "name": "Manchester City FC",
      "crestUrl": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"
  },
  "playedGames": 27,
  "won": 21,
  "draw": 2,
  "lost": 4,
  "points": 65,
  "goalsFor": 74,
  "goalsAgainst": 20,
  "goalDifference": 54
}
*/

export default TableRow;
