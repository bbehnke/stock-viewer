import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Users extends React.Component {
  render() {
    return (
      <div className="users-container">
        USERS
      </div>
    );
  }
}

Users.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
