import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
import PageHeader from '../PageHeader';
import Button from '../Button';
import Footer from '../Footer';
import './Users.css';

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
        <PageHeader value="Please select a user" />
        <ul className="users-user-list">
          {users.map(u => (
            <li key={u.id} className="users-user-item">
              <div className="users-user-item-name">{u.name}</div>
              <Button value="Select" onClick={() => this.onUserClick(u)} />
            </li>
          ))}
        </ul>
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
