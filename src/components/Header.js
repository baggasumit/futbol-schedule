import React from 'react';
import { Link } from '@reach/router';
import GitHubLogo from '../images/github.svg';

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>
          Fútb
          <span role="img" aria-label="Football emoji" className="futbol-emoji">
            ⚽️
          </span>
          l Schedule
        </h1>
      </Link>
      <a href="https://github.com/baggasumit/futbol-schedule/">
        <img src={GitHubLogo} alt="GitHub Logo" />
      </a>
    </header>
  );
}

export default Header;
