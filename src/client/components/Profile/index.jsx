import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Stock.css';
import StockViewer from '../StockViewer';
import { userActions } from '../../actions';

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
      <div className="stock-container">
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

const mapStateToProps = (state) => {
  const { activeUser } = state.user;
  const stock = Object.keys(activeUser.profileStock).map(stockId => state.stock.stock[stockId]);
  return ({
    stock,
    activeUser
  });
};

const mapDispatchToProps = dispatch => ({
  addStockToProfile: (user, s) => dispatch(userActions.addStockToProfile(user, s)),
  removeStockFromProfile: (user, s) => dispatch(userActions.removeStockFromProfile(user, s))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
