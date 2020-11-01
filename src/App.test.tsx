import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { WelcomeComponent } from './components/WelcomeComponent';
import { shallow } from 'enzyme';
import { Input, Form } from 'antd';

test('renders Welcome Component', () => {
  const component = shallow(<App />);
  expect(component.find(WelcomeComponent)).toBeTruthy();
});


it('should set App Component name to Jacek', () => {
    const setName = jest.fn();
    const component = shallow(<WelcomeComponent setName={setName}/>);

    component.find(Input).simulate('change', {target: {value: 'Jacek'}, preventDefault: jest.fn()})
    component.find(Form).simulate('submitCapture', {preventDefault: jest.fn()})

    expect(setName).toBeCalledWith('Jacek');
});
