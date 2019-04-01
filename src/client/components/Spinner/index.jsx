import React from 'react';
import Loader from 'react-loader-spinner';
import './Spinner.css';

const Spinner = () => (
  <div className="stock-viewer-spinner-container">
    <Loader
      color="#6ed3cf"
      type="Triangle"
      height="100"
      width="100"
    />
  </div>
);

Spinner.defaultProps = {};

Spinner.propTypes = {};

export default Spinner;
