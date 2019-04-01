import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Stock.css';
import StockViewer from '../StockViewer';
import Button from '../Button';
import { mainActions, userActions } from '../../actions';
import { getUserStockMap } from '../../selectors';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
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

  onRefreshClick() {
    const { reloadAllStock } = this.props;
    reloadAllStock();
  }

  renderStockActions(s) {
    const { userStockMap } = this.props;
    if (userStockMap[s.id]) {
      return (
        <Button
          value="Remove from profile"
          onClick={() => this.onRemoveClick(s)}
        />
      );
    }
    return (
      <Button
        value="Add to profile"
        onClick={() => this.onAddClick(s)}
      />
    );
  }

  render() {
    const { stock } = this.props;
    return (
      <div className="stock-container">
        <StockViewer
          title="All stock"
          stock={stock}
          renderActions={this.renderStockActions}
          onRefreshClick={this.onRefreshClick}
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
  removeStockFromProfile: PropTypes.func.isRequired,
  reloadAllStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  stock: state.stock.stock,
  userStockMap: getUserStockMap(state)
});

const mapDispatchToProps = dispatch => ({
  addStockToProfile: (user, s) => dispatch(userActions.addStockToProfile(user, s)),
  removeStockFromProfile: (user, s) => dispatch(userActions.removeStockFromProfile(user, s)),
  reloadAllStock: () => dispatch(mainActions.reloadAllStock())
});

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
