import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';
import { Link } from 'react-router-dom';
import {
  USERS, PROFILE, STOCK, NOTIFCATIONS
} from '../../routes';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navPath: USERS };
    this.onNavSelection = this.onNavSelection.bind(this);
  }

  onNavSelection(navPath) {
    const { onNavItemClick } = this.props;
    this.setState({ navPath }, () => { onNavItemClick(navPath); });
  }

  render() {
    const { navPath } = this.state;
    const { enableAll } = this.props;
    return (
      <div className="nav">
        {!enableAll && (
          <Link
            key={USERS}
            className={`nav-item ${navPath === USERS ? 'active' : ''}`}
            to={USERS}
            onClick={() => this.onNavSelection(USERS)}
          >
            Users
          </Link>
        )}
        {enableAll && [
          <Link
            key={STOCK}
            className={`nav-item ${navPath === STOCK ? 'active' : ''}`}
            to={STOCK}
            onClick={() => this.onNavSelection(STOCK)}
          >
            Home
          </Link>,
          <Link
            key={PROFILE}
            className={`nav-item ${navPath === PROFILE ? 'active' : ''}`}
            to={PROFILE}
            onClick={() => this.onNavSelection(PROFILE)}
          >
            Your Profile
          </Link>,
          <Link
            key={NOTIFCATIONS}
            className={`nav-item ${navPath === NOTIFCATIONS ? 'active' : ''}`}
            to={NOTIFCATIONS}
            onClick={() => this.onNavSelection(NOTIFCATIONS)}
          >
            Notifications
          </Link>,
          <Link
            key="BACK_TO_USERS"
            className={`nav-item ${navPath === USERS ? 'active' : ''}`}
            to={USERS}
            onClick={() => this.onNavSelection('back')}
          >
            {'< Back To Users'}
          </Link>
        ]}
      </div>
    );
  }
}

Nav.defaultProps = {
  onNavItemClick: () => {}
};

// TODO make nav items configurable
Nav.propTypes = {
  onNavItemClick: PropTypes.func,
  enableAll: PropTypes.bool.isRequired
};

export default Nav;
