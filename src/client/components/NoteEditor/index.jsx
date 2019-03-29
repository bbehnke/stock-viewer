import React from 'react';
import PropTypes from 'prop-types';
import './NoteEditor.css';

class NoteEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { note } = props;
    const { id } = state;
    if (id === note.id) {
      return null;
    }
    return {
      id: note.id,
      value: note.value
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    const { value } = this.state;
    const { onSaveClick, note } = this.props;
    onSaveClick(note.id, value);
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    return (
      <div className="note-editor">
        <form className="note-editor-form" onSubmit={this.handleSubmit}>
          <textarea
            className="note-editor-text-area"
            value={value}
            onChange={this.handleChange}
          />
          <button className="note-editor-submit" type="submit">Save note</button>
        </form>
      </div>
    );
  }
}

NoteEditor.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  onSaveClick: PropTypes.func.isRequired
};

export default NoteEditor;
