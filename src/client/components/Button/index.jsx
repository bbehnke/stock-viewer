import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ value, onClick, className }) => (
  <button className={`stock-viewer-button ${className}`} type="button" onClick={onClick}>
    {value}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
  className: ''
};

Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Button;
