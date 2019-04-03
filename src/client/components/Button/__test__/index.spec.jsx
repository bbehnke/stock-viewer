import React from 'react';
import { mount } from 'enzyme';
import Button from '..';

describe('Button tests', () => {
  it('renders Button', () => {
    const component = mount(<Button className="test-class" value="test-value" />);
    expect(component).toMatchSnapshot();
  });
  it('renders Button disabled', () => {
    const component = mount(<Button disabled className="test-class" value="test-value" />);
    expect(component).toMatchSnapshot();
  });
  it('onClick called', () => {
    const onClickMock = jest.fn();
    const component = mount(
      <Button
        className="test-class"
        value="test-value"
        onClick={onClickMock}
      />
    );
    component.find('button.stock-viewer-button').simulate('click');
    // component.find('button.note-editor-submit').simulate('submit');
    expect(onClickMock).toBeCalledTimes(1);
  });
});
