import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../../actions';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.onUserClick = this.onUserClick.bind(this);
  }

  onUserClick(user) {
    const { activeUserId, setActiveUser, clearActiveUser } = this.props;
    if (activeUserId === user.id) {
      clearActiveUser();
    } else {
      setActiveUser(user);
    }
  }

  render() {
    const { activeUserId, users } = this.props;
    return (
      <div className="users-container">
        {Object.keys(users).map((userId) => {
          const u = users[userId];
          return (
            <div key={u.id} className="users-user-item">
              <div className="users-user-item-name">{u.name}</div>
              <div className="users-user-item-count">
                {`Sub count: ${Object.keys(u.profileStock).length}`}
              </div>
              <button type="button" onClick={() => this.onUserClick(u)}>
                {activeUserId === u.id ? 'Deselect' : 'Select'}
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

Users.defaultProps = {
  activeUserId: undefined
};

Users.propTypes = {
  activeUserId: PropTypes.string,
  users: PropTypes.shape({}).isRequired,
  setActiveUser: PropTypes.func.isRequired,
  clearActiveUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  activeUserId: state.user.activeUser ? state.user.activeUser.id : undefined,
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  setActiveUser: user => dispatch(userActions.setActiveUser(user)),
  clearActiveUser: () => dispatch(userActions.clearActiveUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
