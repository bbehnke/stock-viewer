import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Stock.css';
import StockViewer from '../StockViewer';
import { userActions } from '../../actions';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.renderStockActions = this.renderStockActions.bind(this);
  }

  onAddClick(s) {
    const { addStockToProfile, activeUser } = this.props;
    addStockToProfile(activeUser, s);
  }

  onRemoveClick(s) {
    const { removeStockFromProfile, activeUser } = this.props;
    removeStockFromProfile(activeUser, s);
  }

  renderStockActions(s) {
    const { activeUser: { profileStock } } = this.props;
    if (profileStock[s.id]) {
      return (
        <button type="button" onClick={() => this.onRemoveClick(s)}>
          Remove from profile
        </button>
      );
    }
    return (
      <button type="button" onClick={() => this.onAddClick(s)}>
        Add to profile
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

Stock.defaultProps = {};

Stock.propTypes = {
  stock: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  activeUser: PropTypes.shape({}).isRequired,
  addStockToProfile: PropTypes.func.isRequired,
  removeStockFromProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const stock = Object.keys(state.stock.stock).map(id => state.stock.stock[id]);
  return ({
    stock,
    activeUser: state.user.activeUser
  });
};

const mapDispatchToProps = dispatch => ({
  addStockToProfile: (user, s) => dispatch(userActions.addStockToProfile(user, s)),
  removeStockFromProfile: (user, s) => dispatch(userActions.removeStockFromProfile(user, s))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
