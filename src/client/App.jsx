import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Users from './components/Users';
import Stock from './components/Stock';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
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
    const { initialize } = this.props;
    initialize();
  }

  onNavItemClick(path) {
    const { clearActiveUser } = this.props;
    if (path === 'back') {
      clearActiveUser();
    }
  }

  render() {
    const { isLoading, user } = this.props;
    return (
      <div className="app-container">
        <div className="app-header">
          <h1>{`Hello${user ? ` ${user.name}` : ''}! Welcome to stock-viewer.`}</h1>
        </div>
        <div className="app-content">
          <MemoryRouter
            initialEntries={[USERS, STOCK, PROFILE, NOTIFCATIONS]}
            initialIndex={0}
          >
            {isLoading && <div>Loading...</div>}
            {!isLoading && [
              <Nav
                key="nav"
                enableAll={typeof user !== 'undefined'}
                onNavItemClick={this.onNavItemClick}
              />,
              <div key="routes" className="app-content-main">
                <Route path={USERS} component={Users} />
                <Route path={STOCK} component={Stock} />
                <Route path={PROFILE} component={Profile} />
                <Route path={NOTIFCATIONS} component={Notifications} />
              </div>
            ]}
          </MemoryRouter>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  user: undefined
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.shape({}),
  initialize: PropTypes.func.isRequired,
  clearActiveUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.page.loading,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(mainActions.initialize()),
  clearActiveUser: () => dispatch(userActions.clearActiveUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
