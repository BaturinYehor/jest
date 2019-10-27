import React from 'react';
import renderer from 'react-test-renderer';
import CalculatorForm from './components/Calculator/CalculatorForm'
import GetNameForm from './components/GetNameForm/GetNameForm'
import Geeting from './components/Greeting/Geeting'
import App from './App'
import {mount} from 'enzyme';

describe('Test suite', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<CalculatorForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Greeting form should have exactly one GetNameForm', () => {
        const wrapper = mount(<Geeting/>);
        expect(wrapper.find(GetNameForm).length).toEqual(1);
    });

    it('passes all props to Counter', () => {
        const wrapper = mount(<Geeting/>);
        const counterWrapper = wrapper.find(GetNameForm);
        expect(counterWrapper.find("GetNameForm").find("button").text()).toEqual('Get information');
    });

    it('Greeting text should be correct', () => {
        const wrapper = mount(<Geeting/>);
        expect(wrapper.find(".text").text()).toEqual('Give us your name and let\'s get straight to it!');
    });

    it('Input field should have correct placeholder', () => {
        const wrapper = mount(<Geeting/>);
        const counterWrapper = wrapper.find(GetNameForm);
        expect(counterWrapper.find("GetNameForm").find("input").props().placeholder).toEqual("Name");
    });

    it('Error should arise', () => {
        const wrapper = mount(<Geeting/>);
        const e = {
            preventDefault: () => {
            },
            target: {
                name: {
                    value: ""
                }
            }
        };
        wrapper.instance().handleSubmit(e);
        expect(wrapper.instance().state.error).toEqual("Name can't be empty");
    });

    it('Name should be set', () => {
        const wrapper = mount(<App />);
        const e = {
            preventDefault: () => {
            },
            target: {
                name: {
                    value: ""
                }
            }
        };
        wrapper.instance().handleSubmit(e);
        expect(wrapper.instance().state.error).toEqual("Name can't be empty");
    });

    it('submit handler should be called', () => {
        let submit = jest.fn();
        const wrapper = mount(<GetNameForm handleSubmit={submit}/>);
        wrapper.find('button').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
    });


});