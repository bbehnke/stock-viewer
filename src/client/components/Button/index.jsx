import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  value, onClick, className, disabled
}) => (
  <button
    className={`stock-viewer-button ${className}`}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
  className: '',
  disabled: false
};

Button.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
