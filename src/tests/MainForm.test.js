import renderer from "react-test-renderer";
import MainForm from "../components/MainForm/MainForm";
import React from "react";
import {mount} from 'enzyme';
import Header from "../components/Header/Header";
import {MemoryRouter} from "react-router-dom/cjs/react-router-dom.min";
import FetchApiForm from "../components/FetchApiForm/FetchApiForm";
import CalculatorForm from "../components/Calculator/CalculatorForm";

describe('GreetingForm test suite', () => {

    it('MainForm should match snapshot', () => {
        const component = renderer.create(<MainForm name={"Nick"}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('MainForm form should have exactly one Header component', () => {
        const wrapper = mount(<MainForm name={"Nick"}/>);
        expect(wrapper.find(Header).length).toEqual(1);
    });

    it('Should redirect to greeting form', () => {
        const wrapper = mount(
            <MemoryRouter>
                <MainForm/>
            </MemoryRouter>
        );
        const app = wrapper.find(MainForm).instance();
        expect(app.render().props.to).toBe("/greeting")
    });

    it('Should render components', () => {
        const name = "Nick";
        const wrapper = mount(
            <MemoryRouter>
                <MainForm name={name}/>
            </MemoryRouter>
        );
        expect(wrapper.find(Header).length).toEqual(1);
        expect(wrapper.find(FetchApiForm).length).toEqual(1);
        expect(wrapper.find(CalculatorForm).length).toEqual(1);
    });

    it('Should pass props to Header component', () => {
        const name = "Nick";
        const wrapper = mount(
            <MemoryRouter>
                <MainForm name={name}/>
            </MemoryRouter>
        );
        expect(wrapper.find("Header").props().name).toEqual(name);
    });
});