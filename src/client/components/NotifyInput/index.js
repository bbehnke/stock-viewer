import React from 'react';
import PropTypes from 'prop-types';
import './NotifyInput.css';

class NotifyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 2 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    const { onChange } = this.props;
    this.setState({
      value
    },
    () => {
      onChange(value);
    });
  }

  render() {
    const { value } = this.state;
    return (
      <div className="notify-input-container">
        <div>Notify me when price is the same for</div>
        <select value={value} onChange={this.handleChange}>
          {
            Array.from(Array(58).keys())
              .map(i => <option key={`notify-option${i}`} value={i + 2}>{i + 2}</option>)
          }
        </select>
        <div>days</div>
      </div>
    );
  }
}

NotifyInput.defaultProps = {
  onChange: () => {}
};

NotifyInput.propTypes = {
  onChange: PropTypes.func
};

export default NotifyInput;
