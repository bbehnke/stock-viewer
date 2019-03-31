import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.css';
import StockViewer from '../StockViewer';
import NotifyInput from '../NotifyInput';
import { userActions } from '../../actions';
import { getUserProfileStockList } from '../../selectors';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.renderStockActions = this.renderStockActions.bind(this);
  }

  onRemoveClick(s) {
    const { removeStockFromProfile, activeUser } = this.props;
    removeStockFromProfile(activeUser, s);
  }

  renderStockActions(s) {
    return (
      <button type="button" onClick={() => this.onRemoveClick(s)}>
        Remove from profile
      </button>
    );
  }

  render() {
    const { stock } = this.props;
    return (
      <div className="profile-container">
        <NotifyInput />
        <StockViewer
          stock={stock}
          renderActions={this.renderStockActions}
        />
      </div>
    );
  }
}

Profile.defaultProps = {};

Profile.propTypes = {
  stock: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeUser: PropTypes.shape({}).isRequired,
  removeStockFromProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stock: getUserProfileStockList(state),
  activeUser: state.user.activeUser
});

const mapDispatchToProps = dispatch => ({
  addStockToProfile: (user, s) => dispatch(userActions.addStockToProfile(user, s)),
  removeStockFromProfile: (user, s) => dispatch(userActions.removeStockFromProfile(user, s))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
