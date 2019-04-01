import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.css';
import StockViewer from '../StockViewer';
import { mainActions, userActions } from '../../actions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
    this.renderStockActions = this.renderStockActions.bind(this);
  }

  onRemoveClick(s) {
    const { removeStockFromProfile } = this.props;
    removeStockFromProfile(s);
  }

  onRefreshClick() {
    const { reloadAllStock } = this.props;
    reloadAllStock();
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
        <StockViewer
          stock={stock}
          renderActions={this.renderStockActions}
          onRefreshClick={this.onRefreshClick}
        />
      </div>
    );
  }
}

Profile.defaultProps = {};

Profile.propTypes = {
  stock: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  removeStockFromProfile: PropTypes.func.isRequired,
  reloadAllStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stock: state.user.stock
});

const mapDispatchToProps = dispatch => ({
  removeStockFromProfile: s => dispatch(userActions.removeStockFromProfile(s)),
  reloadAllStock: () => dispatch(mainActions.reloadAllStock())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
