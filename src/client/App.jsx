import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { connect } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Stock from './components/Stock';
import Users from './components/Users';
import { mainActions } from './actions';
import { USERS, PROFILE, STOCK } from './routes';

class App extends React.Component {
  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }

  render() {
    const { isLoading, activeUser } = this.props;
    return (
      <div className="app-container">
        <div className="app-header">
          <h1>Hello! Welcome to stock-viewer.</h1>
        </div>
        <div className="app-content">
          <MemoryRouter
            initialEntries={[USERS, PROFILE, STOCK]}
            initialIndex={0}
          >
            {isLoading && <div>Loading...</div>}
            {!isLoading && [
              <Nav
                key="nav"
                enableAll={typeof activeUser !== 'undefined'}
              />,
              <div key="routes" className="app-content-main">
                <Route path={USERS} component={Users} />
                <Route path={PROFILE} component={Profile} />
                <Route path={STOCK} component={Stock} />
              </div>
            ]}
          </MemoryRouter>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  activeUser: undefined
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  activeUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    profileStock: PropTypes.shape({})
  }),
  initialize: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.page.loading,
  activeUser: state.user.activeUser
});

const mapDispatchToProps = dispatch => ({
  initialize: () => dispatch(mainActions.initialize())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
