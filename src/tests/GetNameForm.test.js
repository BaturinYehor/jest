import React from 'react';
import GetNameForm from '../components/GetNameForm/GetNameForm'
import {mount} from 'enzyme';
import renderer from "react-test-renderer";

let wrapper;
let instance;

describe('GetNameForm', () => {

    beforeEach(() => {
        wrapper = mount(<GetNameForm/>);
        instance = wrapper.instance();
    });

    it('Should match snapshot', () => {
        const component = renderer.create(<GetNameForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button should have correct text', () => {
        const buttonText = "Get information";
        expect(wrapper.find("button").text()).toEqual(buttonText);
    });

    it('Input field should have correct placeholder', () => {
        const expectedPlaceholder = "Name";
        expect(wrapper.find("input").props().placeholder).toEqual(expectedPlaceholder);
    });

    it('Submit handler should be called', () => {
        let submit = jest.fn();
        const wrapper = mount(<GetNameForm handleSubmit={submit}/>);
        wrapper.find('button').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
    });
});