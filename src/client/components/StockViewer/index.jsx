import React from 'react';
import PropTypes from 'prop-types';
import './StockViewer.css';
import { connect } from 'react-redux';
import { stock as stockActions } from '../../actions';

class StockViewer extends React.Component {
  componentDidMount() {
    const { initialze } = this.props;
    initialze();
  }

  render() {
    const { stock, isLoading } = this.props;
    if (isLoading) {
      // TODO replace with actual spinner
      return <div>Loading...</div>;
    }

    return (
      <div className="stock-viewer-container">
        <div className="stock-viewer-header">
          <h1>Hello! Welcome to stock-viewer</h1>
        </div>
        <div className="stock-viewer-view">
          <ul className="stock-viewer-stock-list">
            {stock.map(s => (
              <li key={s.id} className="stock-viewer-stock">
                <div className="stock-viewer-stock-name">{s.name}</div>
                <div className="stock-viewer-stock-chart">chart</div>
                <div className="stock-viewer-stock-change">change</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

StockViewer.propTypes = {
  initialze: PropTypes.func.isRequired,
  stock: PropTypes.arrayOf(PropTypes.shape({
    // TODO
  })).isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  stock: state.stock,
  isLoading: state.page.loading
});

const mapDispatchToProps = dispatch => ({
  initialze: () => dispatch(stockActions.initializeStock())
});

export default connect(mapStateToProps, mapDispatchToProps)(StockViewer);
