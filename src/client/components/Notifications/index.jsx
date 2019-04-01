import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Notifications.css';
import NotifyInput from '../NotifyInput';
import { notificationActions } from '../../actions';
// import { getUserProfileStockList } from '../../selectors';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.onNotifyDaysSubmit = this.onNotifyDaysSubmit.bind(this);
    this.onDisableNotifyDays = this.onDisableNotifyDays.bind(this);
  }

  onNotifyDaysSubmit(notifyDays) {
    // TODO
  }

  onDisableNotifyDays() {
    // TODO
  }

  render() {
    return (
      <div className="notifications-container">
        <NotifyInput />
      </div>
    );
  }
}

Notifications.defaultProps = {};

Notifications.propTypes = {
  setNotifyDays: PropTypes.func.isRequired,
  disableNotifyDays: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  setNotifyDays: (notifyDays) => dispatch(notificationActions.setNotifyDays(user, s)),
  disableNotifyDays: () => dispatch(notificationActions.disableNotifyDays())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
