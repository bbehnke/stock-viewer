// TODO update to be accessible compliant
/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import './NotesListItem.css';

const previewLength = 20;

class NotesListItem extends React.PureComponent {
  render() {
    const { note, active, onItemClick } = this.props;
    const preview = note.value.length > 20
      ? `${note.value.slice(0, previewLength - 3)}...` : note.value;
    const classPrefix = 'notes-list-item-';
    return (
      <li
        onClick={() => onItemClick(note.id - 1)}
        className={`${classPrefix}container${active ? ' active' : ''}`}
      >
        <div className={`${classPrefix}id`}>{note.id}</div>
        <div className={`${classPrefix}preview`}>{preview}</div>
      </li>
    );
  }
}

NotesListItem.defaultProps = {
  active: false,
  onItemClick: () => {}
};

NotesListItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  active: PropTypes.bool,
  onItemClick: PropTypes.func
};

export default NotesListItem;
