import React from 'react';
import PropTypes from 'prop-types';

class AutoComplete extends React.Component {
  static propTypes = {
    teams: PropTypes.array.isRequired,
  };

  state = {
    activeOption: 0,
    filteredTeams: [],
    showOptions: false,
    userInput: '',
    selectedTeamId: 0,
  };

  onChange = (e) => {
    console.log('onChanges');

    const { teams } = this.props;
    const userInput = e.currentTarget.value;

    const filteredTeams = teams
      .filter(
        ([_, team]) =>
          team.name.toLowerCase().includes(userInput.toLowerCase()) ||
          team.shortName.toLowerCase().includes(userInput.toLowerCase())
      )
      .slice(0, 10);

    this.setState({
      activeOption: 0,
      filteredTeams,
      showOptions: true,
      userInput: e.currentTarget.value,
      selectedTeamId: '',
    });
  };

  onClick = (e) => {
    const selectedTeamId = e.currentTarget.dataset.teamid;
    this.setState({
      activeOption: 0,
      filteredTeams: [],
      showOptions: false,
      userInput: e.currentTarget.innerText,
      selectedTeamId,
    });
  };

  onKeyDown = (e) => {
    const { activeOption, filteredTeams } = this.state;

    if (e.keyCode === 13) {
      // Enter key
      const [id, team] = filteredTeams[activeOption];
      this.setState({
        activeOption: 0,
        showOptions: false,
        userInput: team.shortName,
        selectedTeamId: id,
      });
    } else if (e.keyCode === 38) {
      // Up Arrow key
      if (activeOption === 0) {
        return;
      }
      this.setState({ activeOption: activeOption - 1 });
    } else if (e.keyCode === 40) {
      // Down Arrow key
      if (activeOption === filteredTeams.length - 1) {
        console.log(activeOption);
        return;
      }
      this.setState({ activeOption: activeOption + 1 });
    }
  };

  addTeam = () => {
    const { addTeam } = this.props;
    const { selectedTeamId } = this.state;
    if (selectedTeamId) {
      addTeam(Number(selectedTeamId));
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      addTeam,
      state: {
        activeOption,
        filteredTeams,
        showOptions,
        userInput,
        selectedTeamId,
      },
    } = this;
    let optionList;
    if (showOptions && userInput) {
      if (filteredTeams.length) {
        optionList = (
          <ul className="options">
            {filteredTeams.map(([id, team], index) => {
              let className;
              if (index === activeOption) {
                className = 'option-active';
              }
              return (
                <li
                  className={className}
                  key={id}
                  onClick={onClick}
                  data-teamid={id}
                >
                  {team.shortName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className="no-options">
            <em>No Option!</em>
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <div className="search">
          <div className="search-bar">
            <div className="search-box">
              <span className="search-icon">&#9906;</span>
              <input
                type="text"
                className="search-input-box"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                placeholder="Search Teams"
              />
            </div>
            <button
              className="add-team"
              onClick={addTeam}
              disabled={selectedTeamId === ''}
            >
              Add
            </button>
          </div>
          {optionList}
        </div>
      </React.Fragment>
    );
  }
}

export default AutoComplete;
