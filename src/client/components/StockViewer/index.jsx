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
    const { stock, renderActions } = this.props;
    if (stock.length === 0) {
      return null;
    }
    return (
      <div className="stock-viewer-container">
        <div className="stock-viewer-view">
          <ul className="stock-viewer-stock-list">
            {stock.map(s => (
              <li key={s.id} className="stock-viewer-stock">
                <div className="stock-viewer-stock-details">
                  <div className="stock-viewer-stock-name">{s.name}</div>
                  <div className="stock-viewer-stock-value">{s.currentValue}</div>
                  <div className="stock-viewer-stock-actions">{renderActions(s)}</div>
                </div>
                <LineChart className="stock-viewer-stock-chart" width={559} height={200} data={s.data}>
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin', 'dataMax']} />
                  <CartesianGrid stroke="#ebf3f0" />
                  <Tooltip content={<StockTooltip />} />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

StockViewer.defaultProps = {
  stock: [],
  renderActions: () => {}
};

StockViewer.propTypes = {
  stock: PropTypes.arrayOf(PropTypes.shape({})),
  renderActions: PropTypes.func
};

export default StockViewer;
