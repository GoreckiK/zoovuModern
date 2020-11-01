import * as React from 'react';
import { shallow } from 'enzyme';
import { WelcomeComponent } from '../WelcomeComponent';
import { Input } from 'antd';

describe('#WelcomeComponent', () => {
    const setState = jest.fn();
    const useStateMock = (initialState: any) => [initialState, setState]; 

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should set local name to Maciek', () => {
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);
        const component = shallow(<WelcomeComponent setName={jest.fn()}/>);
        
        component.find(Input).simulate('change', {target: {value: 'Maciek'}, preventDefault: jest.fn()})

        expect(setState).toBeCalledWith('Maciek');
    });
});
