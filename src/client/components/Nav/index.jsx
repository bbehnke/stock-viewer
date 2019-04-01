import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';
import { Link, withRouter } from 'react-router-dom';
import {
  USERS, PROFILE, STOCK, NOTIFCATIONS
} from '../../routes';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navPath: STOCK };
    this.onNavSelection = this.onNavSelection.bind(this);
  }

  onNavSelection(navPath) {
    const { onNavItemClick, disable } = this.props;
    if (!disable) {
      const localPath = navPath === 'back' ? STOCK : navPath;
      this.setState({ navPath: localPath }, () => { onNavItemClick(navPath); });
    }
  }

  render() {
    const { navPath } = this.state;
    const {
      location, disable, profileStockCount, notificationCount
    } = this.props;
    if (location.pathname === USERS) {
      return null;
    }
    const disableClass = disable ? ' disable' : '';
    return (
      <div className="nav">
        <Link
          key={STOCK}
          className={`nav-item ${navPath === STOCK ? 'active' : ''}${disableClass}`}
          to={STOCK}
          onClick={() => this.onNavSelection(STOCK)}
        >
          Home
        </Link>
        <Link
          key={PROFILE}
          className={`nav-item ${navPath === PROFILE ? 'active' : ''}${disableClass}`}
          to={PROFILE}
          onClick={() => this.onNavSelection(PROFILE)}
        >
          {`Your Profile ( ${profileStockCount} )`}
        </Link>
        <Link
          key={NOTIFCATIONS}
          className={`nav-item ${navPath === NOTIFCATIONS ? 'active' : ''}${disableClass}`}
          to={NOTIFCATIONS}
          onClick={() => this.onNavSelection(NOTIFCATIONS)}
        >
          {`Notifications ( ${notificationCount} )`}
        </Link>
        <Link
          key="BACK_TO_USERS"
          className={`nav-item ${disableClass}`}
          to={USERS}
          onClick={() => this.onNavSelection('back')}
        >
          {'Sign Out'}
        </Link>
      </div>
    );
  }
}

Nav.defaultProps = {
  onNavItemClick: () => {},
  profileStockCount: 0,
  notificationCount: 0,
  disable: false
};

Nav.propTypes = {
  onNavItemClick: PropTypes.func,
  location: PropTypes.shape({}).isRequired,
  profileStockCount: PropTypes.number,
  notificationCount: PropTypes.number,
  disable: PropTypes.bool
};

export default withRouter(Nav);
