import React from 'react';
import PropTypes from 'prop-types';
import './StockViewer.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import StockTooltip from '../StockToolTip';

class StockViewer extends React.PureComponent {
  render() {
    const { stock, onAddClick, onRemoveClick } = this.props;
    if (!stock || !stock.length) {
      return null;
    }
    return (
      <div className="stock-viewer-container">
        <div className="stock-viewer-view">
          <ul className="stock-viewer-stock-list">
            {stock.map(s => (
              <li key={s.id} className="stock-viewer-stock">
                <div className="stock-viewer-stock-name">{s.name}</div>
                <LineChart className="stock-viewer-stock-chart" width={600} height={200} data={s.data}>
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin', 'dataMax']} />
                  <CartesianGrid stroke="#ebf3f0" />
                  <Tooltip content={<StockTooltip />} />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
                <div className="stock-viewer-stock-value">{s.currentValue}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

StockViewer.defaultProps = {
  onAddClick: undefined,
  onRemoveClick: undefined
};

StockViewer.propTypes = {
  stock: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      change: PropTypes.number.isRequired
    })).isRequired,
    currentValue: PropTypes.number.isRequired
  })).isRequired,
  onAddClick: PropTypes.func,
  onRemoveClick: PropTypes.func
};

export default StockViewer;
