import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = ({ children }) => (
  <div className="stock-viewer-footer">
    {children}
  </div>
);

Footer.defaultProps = {
  children: []
};

Footer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

export default Footer;
