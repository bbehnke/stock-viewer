import React from 'react';
import PropTypes from 'prop-types';
import './Notes.css';
import { connect } from 'react-redux';
import { notes as notesActions } from '../../actions';
import NotesInvalidPath from '../NotesInvalidPath';
import NotesList from '../NotesList';
import NoteEditor from '../NoteEditor';

const getPathActiveNoteIndex = (location) => {
  const pathValue = location.pathname.replace('/', '');
  let activeNoteIndex = 0;
  if (pathValue) {
    activeNoteIndex = parseInt(pathValue, 10) - 1;
    if (Number.isNaN(activeNoteIndex)) {
      activeNoteIndex = undefined;
    }
  }
  return activeNoteIndex;
};

class Notes extends React.Component {
  constructor(props) {
    super(props);

    const { location } = this.props;
    this.state = {
      activeNoteIndex: getPathActiveNoteIndex(location)
    };

    this.handlePopState = this.handlePopState.bind(this);
    this.handleInvalidGoBackClick = this.handleInvalidGoBackClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  componentDidMount() {
    const { initialze } = this.props;
    initialze();
    window.onpopstate = this.handlePopState;
  }

  componentWillUnmount() {
    window.onpopstate = null;
  }

  handlePopState(e) {
    e.preventDefault();
    const { location } = this.props;
    this.setState({
      activeNoteIndex: getPathActiveNoteIndex(location)
    });
  }

  handleInvalidGoBackClick() {
    const { history } = this.props;
    this.setState({
      activeNoteIndex: 0
    },
    () => {
      history.push('/1');
    });
  }

  handleItemClick(index) {
    const { history } = this.props;
    this.setState({
      activeNoteIndex: index
    },
    () => {
      history.push(`/${index + 1}`);
    });
  }

  handleSaveClick(id, value) {
    const { updateNote, notes } = this.props;
    const { activeNoteIndex } = this.state;
    const activeNote = notes[activeNoteIndex];
    if (activeNote.value !== value) {
      updateNote(id, value);
    }
  }

  handleCreateClick() {
    const { createNote } = this.props;
    createNote();
  }

  render() {
    const { notes, isLoading } = this.props;
    if (isLoading) {
      // TODO replace with actual spinner
      return <div>Loading...</div>;
    }

    const { activeNoteIndex } = this.state;
    const invalid = typeof activeNoteIndex === 'undefined'
      || activeNoteIndex < 0
      || activeNoteIndex > notes.length - 1;
    let content;
    if (invalid) {
      content = <NotesInvalidPath onGoBackClick={this.handleInvalidGoBackClick} />;
    } else {
      const activeNote = notes[activeNoteIndex];
      content = (
        <div className="notes-container">
          <NotesList
            notes={notes}
            activeNoteIndex={activeNoteIndex}
            onItemClick={this.handleItemClick}
            onCreateClick={this.handleCreateClick}
          />
          <NoteEditor note={activeNote} onSaveClick={this.handleSaveClick} />
        </div>
      );
    }
    return content;
  }
}

Notes.propTypes = {
  initialze: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  createNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  notes: state.notes,
  isLoading: state.page.loading
});

const mapDispatchToProps = dispatch => ({
  initialze: () => dispatch(notesActions.initializeNotes()),
  updateNote: (id, value) => dispatch(notesActions.updateNote(id, value)),
  createNote: () => dispatch(notesActions.createNote())
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
