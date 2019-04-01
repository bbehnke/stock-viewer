import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Spinner from './components/Spinner';
import Nav from './components/Nav';
import Users from './components/Users';
import Stock from './components/Stock';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Footer from './components/Footer';
import { mainActions, userActions } from './actions';
import {
  USERS, PROFILE, STOCK, NOTIFCATIONS
} from './routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onNavItemClick = this.onNavItemClick.bind(this);
  }

  componentDidMount() {
    const { initialize, history } = this.props;
    initialize(history);
  }

  onNavItemClick(path) {
    const { clearActiveUser } = this.props;
    if (path === 'back') {
      sessionStorage.removeItem('active_user_id');
      clearActiveUser();
    }
  }

  render() {
    const {
      isLoading, user, notifications, profileStock
    } = this.props;
    return (
      <div className="app-container">
        <div className="app-header">
          <h1>{`Hello${user ? ` ${user.name}` : ''}! Welcome to stock-viewer`}</h1>
        </div>
        <div className="app-content">
          <Nav
            key="nav"
            onNavItemClick={this.onNavItemClick}
            profileStockCount={profileStock.length}
            notificationCount={notifications.length}
            disable={isLoading}
          />
          {isLoading && <Spinner />}
          {!isLoading && (
            <div key="routes" className="app-content-main">
              <Route path={USERS} component={Users} />
              <Route path={STOCK} component={Stock} />
              <Route path={PROFILE} component={Profile} />
              <Route path={NOTIFCATIONS} component={Notifications} />
            </div>
          )}
          <Footer />
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  user: undefined,
  notifications: [],
  profileStock: []
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}),
  initialize: PropTypes.func.isRequired,
  clearActiveUser: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({})),
  profileStock: PropTypes.arrayOf(PropTypes.shape({})),
  history: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  isLoading: state.page.loading,
  user: state.user.user,
  notifications: state.user.notifications,
  profileStock: state.user.stock
});

const mapDispatchToProps = dispatch => ({
  initialize: history => dispatch(mainActions.initialize(history)),
  clearActiveUser: () => dispatch(userActions.clearActiveUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
