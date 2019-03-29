import React from 'react';
import PropTypes from 'prop-types';
import './NotesInvalidPath.css';

class NotesInvalidPath extends React.PureComponent {
  render() {
    const { onGoBackClick } = this.props;
    return (
      <div
        className="notes-invalid-path-container"
      >
        <h1>
          You have entered an invalid note path. Click &apos;Go back&apos; to return to notes.
        </h1>
        <button type="button" onClick={onGoBackClick}>Go back</button>
      </div>
    );
  }
}

NotesInvalidPath.defaultProps = {
  onGoBackClick: () => {}
};

NotesInvalidPath.propTypes = {
  onGoBackClick: PropTypes.func
};

export default NotesInvalidPath;
