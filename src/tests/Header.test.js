import renderer from "react-test-renderer";
import Header from "../components/Header/Header";
import React from "react";
import {mount} from "enzyme/build";

let wrapper;
let instance;

describe('Header', () => {

    beforeEach(() => {
        wrapper = mount(<Header/>);
        instance = wrapper.instance();
    });

    it('Should match snapshot', () => {
        const component = renderer.create(<Header/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Function to build header should be called', () => {
        const spy = jest.spyOn(instance, 'buildHelloString');
        instance.forceUpdate();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('Correct text should be set when props are given', () => {
        const expectedName = "Nick";
        const expectedMockedMessage = "Mocked message " + expectedName;
        const mock = jest.fn();
        mock.mockReturnValueOnce(expectedMockedMessage);

        const wrapper = mount(<Header name={expectedName}/>);
        wrapper.buildHelloString = mock;

        const instance = wrapper.instance();
        instance.buildHelloString = mock;

        instance.forceUpdate();
        wrapper.update();

        expect(wrapper.find('.text').get(0).props.children).toEqual(expectedMockedMessage);
    });

    it('Correct string should be built by buildHelloString', () => {
        const expectedName = "Nick";
        const wrapper = mount(<Header name={expectedName}/>);
        const instance = wrapper.instance();
        expect(instance.buildHelloString()).toEqual('Hello ' + expectedName);
    });
});