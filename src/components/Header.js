import React from 'react';
import { Link } from '@reach/router';
import GitHubLogo from '../images/github.svg';

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <h1>
          Fútb
          <span role="img" aria-label="Football emoji" className="futbol-emoji">
            ⚽️
          </span>
          l Schedule
        </h1>
      </Link>
      <Link to="/">Matches</Link>
      <Link to="/standings">Standings</Link>
      <a
        href="https://github.com/baggasumit/futbol-schedule/"
        className="github-icon"
      >
        <img src={GitHubLogo} alt="GitHub Logo" />
      </a>
    </header>
  );
}

export default Header;
