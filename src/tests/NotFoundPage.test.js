import renderer from "react-test-renderer";
import React from "react";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import {mount} from "enzyme/build";

let wrapper;

describe('NotFoundPage', () => {

    beforeEach(() => {
        wrapper = mount(<NotFoundPage/>);
    });

    it('Should match snapshot', () => {
        const component = renderer.create(<NotFoundPage/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Should have correct warning text', () => {
        const expectedTest = "404 page not found";
        expect(wrapper.find('.text').get(0).props.children[0].props.children).toEqual(expectedTest);
    });

    it('Should have correct ref text', () => {
        const expectedTest = "To greeting form";
        expect(wrapper.find('.text').get(0).props.children[1].props.children).toEqual(expectedTest);
    });

    it('Ref should have correct url', () => {
        const url = "/greeting";
        expect(wrapper.find('.text').get(0).props.children[1].props.href).toEqual(url);
    });
});