import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './NotifyInput.css';

class NotifyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.initialValue };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    const { onChange } = this.props;
    const intValue = parseInt(value, 10);
    this.setState({
      value: intValue
    }, () => { onChange(intValue); });
  }

  render() {
    const { value } = this.state;
    const { submitDisabled, onSubmit } = this.props;
    return (
      <div className="notify-input-container">
        <div>Notify me when price is the same for</div>
        <select
          className="stock-viewer-selector"
          value={value}
          onChange={this.handleChange}
        >
          {
            Array.from(Array(14).keys())
              .map(i => (
                <option key={`notify-option${i}`} value={i + 2}>
                  {i + 2}
                </option>
              ))
          }
        </select>
        <div>days</div>
        <Button
          className="notify-input-submit"
          value="Submit"
          disabled={submitDisabled}
          onClick={() => { onSubmit(value); }}
        />
      </div>
    );
  }
}

NotifyInput.defaultProps = {
  initialValue: 2,
  submitDisabled: false,
  onChange: () => {},
  onSubmit: () => {}
};

NotifyInput.propTypes = {
  initialValue: PropTypes.number,
  submitDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export default NotifyInput;
