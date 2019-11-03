import React from 'react';
import GetNameForm from '../components/GetNameForm/GetNameForm'
import {mount} from 'enzyme';

it('Button should have correct text', () => {
    const wrapper = mount(<GetNameForm/>);
    const counterWrapper = wrapper.find(GetNameForm);
    expect(counterWrapper.find("GetNameForm").find("button").text()).toEqual('Get information');
});

it('Input field should have correct placeholder', () => {
    const wrapper = mount(<GetNameForm/>);
    const counterWrapper = wrapper.find(GetNameForm);
    expect(counterWrapper.find("GetNameForm").find("input").props().placeholder).toEqual("Name");
});