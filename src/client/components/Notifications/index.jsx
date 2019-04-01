import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Notifications.css';
import NotifyInput from '../NotifyInput';
import { userActions } from '../../actions';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifyDaysSubmitDisabled: typeof props.notifyDays !== 'undefined'
    };
    this.onNotifyDaysChange = this.onNotifyDaysChange.bind(this);
    this.onNotifyDaysSubmit = this.onNotifyDaysSubmit.bind(this);
  }


  onNotifyDaysChange(value) {
    const { notifyDays } = this.props;
    this.setState({
      notifyDaysSubmitDisabled: notifyDays === value
    });
  }

  onNotifyDaysSubmit(value) {
    const { setNotifyDays } = this.props;
    setNotifyDays(value);
  }

  render() {
    const { notifyDaysSubmitDisabled } = this.state;
    const { notifyDays, notifications } = this.props;
    return (
      <div className="notifications-container">
        <NotifyInput
          initialValue={notifyDays}
          submitDisabled={notifyDaysSubmitDisabled}
          onChange={this.onNotifyDaysChange}
          onSubmit={this.onNotifyDaysSubmit}
        />
        <ul>
          {notifications.map(n => (
            <li key={n.id}>
              <div>{new Date(n.date).toISOString()}</div>
              <div>{n.message}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Notifications.defaultProps = {
  notifyDays: undefined
};

Notifications.propTypes = {
  notifyDays: PropTypes.number,
  setNotifyDays: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = state => ({
  notifyDays: state.user.user.notifyDays,
  notifications: state.user.notifications
});

const mapDispatchToProps = dispatch => ({
  setNotifyDays: value => dispatch(userActions.setNotifyDays(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
