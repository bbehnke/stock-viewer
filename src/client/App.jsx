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
  constructor(props) {
    super(props);
    this.onNavSelection = this.onNavSelection.bind(this);
  }

  componentDidMount() {
    const { initialize } = this.props;
    initialize();
  }

  onNavSelection(navPath) {
    // TODO handle USER
  }

  render() {
    const { isLoading, activeUser } = this.props;
    if (isLoading) {
      return <div>Loading...</div>;
    }
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
            <Nav
              enableAll={typeof activeUser !== 'undefined'}
              onNavItemClick={this.onNavSelection}
            />
            <div className="app-content-main">
              <Route path={USERS} component={Users} />
              <Route path={PROFILE} component={Profile} />
              <Route path={STOCK} component={Stock} />
            </div>
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
