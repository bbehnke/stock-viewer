import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.css';

const PageHeader = ({ value }) => (<h2 className="page-header">{value}</h2>);

PageHeader.defaultProps = {};

PageHeader.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired
};

export default PageHeader;
