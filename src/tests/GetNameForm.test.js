import React from 'react';
import GetNameForm from '../components/GetNameForm/GetNameForm'
import {mount} from 'enzyme';
import renderer from "react-test-renderer";

describe('GetNameForm test suite', () => {

    it('GetNameForm should match snapshot', () => {
        const component = renderer.create(<GetNameForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button should have correct text', () => {
        const wrapper = mount(<GetNameForm/>);
        expect(wrapper.find("button").text()).toEqual('Get information');
    });

    it('Input field should have correct placeholder', () => {
        const wrapper = mount(<GetNameForm/>);
        expect(wrapper.find("input").props().placeholder).toEqual("Name");
    });

    it('Submit handler should be called', () => {
        let submit = jest.fn();
        const wrapper = mount(<GetNameForm handleSubmit={submit}/>);
        wrapper.find('button').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
    });
});