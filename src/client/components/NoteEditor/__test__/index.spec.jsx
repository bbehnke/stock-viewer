import React from 'react';
import { mount } from 'enzyme';
import NoteEditor from '..';

describe('NoteEditor tests', () => {
  it('renders note editor', () => {
    const note = { id: 1, value: 'test_value' };
    const component = mount(<NoteEditor note={note} onSaveClick={() => {}} />);
    expect(component).toMatchSnapshot();
  });
  it('onSaveClick called', () => {
    const note = { id: 1, value: 'test_value' };
    const updatedValue = 'test_updated_value';
    const onSaveClickMock = jest.fn();
    const component = mount(<NoteEditor note={note} onSaveClick={onSaveClickMock} />);
    component.find('textarea.note-editor-text-area').simulate('change', { target: { value: updatedValue } });
    component.find('button.note-editor-submit').simulate('submit');
    expect(onSaveClickMock).toBeCalledWith(note.id, updatedValue);
  });
});
