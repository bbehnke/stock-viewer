import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Profile extends React.Component {
  render() {
    return (
      <div className="stock-viewer-container">
        profile
      </div>
    );
  }
}

Profile.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
