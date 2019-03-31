import React from 'react';
import PropTypes from 'prop-types';
import './StockToolTip.css';

const StockTooltip = ({ active, payload }) => {
  if (active && payload) {
    const { date, value, change } = payload[0].payload;
    const changeStr = change < 0 ? `-$${Math.abs(change)}` : `$${change}`;
    return (
      <div className="stock-tooltip">
        <div>{`Date: ${date}`}</div>
        <div>{`Price: $${value}`}</div>
        <div>{`Change: ${changeStr}`}</div>
      </div>
    );
  }
  return null;
};

StockTooltip.defaultProps = {
  active: false,
  payload: undefined
};

StockTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({}))
};

export default StockTooltip;
