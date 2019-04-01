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
    const { loadUser, history } = this.props;
    loadUser(user, history);
  }

  render() {
    const { users } = this.props;
    return (
      <div className="users-container">
        {users.map(u => (
          <div key={u.id} className="users-user-item">
            <div className="users-user-item-name">{u.name}</div>
            <button type="button" onClick={() => this.onUserClick(u)}>
                Select
            </button>
          </div>
        ))}
      </div>
    );
  }
}

Users.defaultProps = {
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadUser: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  loadUser: (user, history) => dispatch(userActions.loadUser(user, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
