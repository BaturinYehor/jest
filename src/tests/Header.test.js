import renderer from "react-test-renderer";
import Header from "../components/Header/Header";
import React from "react";
import {mount} from "enzyme/build";

describe('Header test suite', () => {

    it('Header should match snapshot', () => {
        const component = renderer.create(<Header/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Function to build header should be called', () => {
        const wrapper = mount(<Header/>);
        const instance = wrapper.instance();
        const spy = jest.spyOn(instance, 'buildHelloString');
        instance.forceUpdate();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Correct text should be set when props are given', () => {
        const expectedName = "Nick";
        const wrapper = mount(<Header name={expectedName}/>);
        expect(wrapper.find(".text").props().children).toEqual("Hello " + expectedName);
    });

    it('Correct string should be built', () => {
        const expectedName = "Nick";
        const wrapper = mount(<Header name={expectedName}/>);
        const instance = wrapper.instance();
        expect(instance.buildHelloString()).toEqual('Hello ' + expectedName);
    });
});