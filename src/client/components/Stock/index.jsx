import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Stock.css';
import StockViewer from '../StockViewer';
import { userActions } from '../../actions';
import { getUserStockMap } from '../../selectors';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.renderStockActions = this.renderStockActions.bind(this);
  }

  onAddClick(s) {
    const { addStockToProfile } = this.props;
    addStockToProfile(s);
  }

  onRemoveClick(s) {
    const { removeStockFromProfile } = this.props;
    removeStockFromProfile(s);
  }

  renderStockActions(s) {
    const { userStockMap } = this.props;
    if (userStockMap[s.id]) {
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
  userStockMap: PropTypes.shape({}).isRequired,
  addStockToProfile: PropTypes.func.isRequired,
  removeStockFromProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stock: state.stock.stock,
  userStockMap: getUserStockMap(state)
});

const mapDispatchToProps = dispatch => ({
  addStockToProfile: (user, s) => dispatch(userActions.addStockToProfile(user, s)),
  removeStockFromProfile: (user, s) => dispatch(userActions.removeStockFromProfile(user, s))
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
