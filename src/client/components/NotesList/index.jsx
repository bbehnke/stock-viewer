import React from 'react';
import PropTypes from 'prop-types';
import './NotesList.css';
import NotesListItem from '../NotesListItem';

class NotesList extends React.PureComponent {
  render() {
    const {
      notes,
      activeNoteIndex,
      onItemClick,
      onCreateClick
    } = this.props;
    return (
      <ul className="notes-list">
        {
          notes.map((note, index) => (
            <NotesListItem
              key={note.id}
              note={note}
              active={index === activeNoteIndex}
              onItemClick={onItemClick}
            />
          ))
        }
        <li>
          <button
            className="notes-list-create-button"
            type="button"
            onClick={onCreateClick}
          >
            Create note
          </button>
        </li>
      </ul>
    );
  }
}

NotesList.defaultProps = {
  activeNoteIndex: undefined
};

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  activeNoteIndex: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
  onCreateClick: PropTypes.func.isRequired
};

export default NotesList;
