import React from 'react';
import renderer from 'react-test-renderer';
import CalculatorForm from './src/components/Calculator/CalculatorForm'
import GetNameForm from './src/components/GetNameForm/GetNameForm'
import Geeting from './src/components/Greeting/Geeting'
import { mount } from 'enzyme';

describe('Counter', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<CalculatorForm />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the inner Counter', () => {
        const wrapper = mount(<Geeting />);
        expect(wrapper.find(GetNameForm).length).toEqual(1);
    });

    it('passes all props to Counter', () => {
        const wrapper = mount(<Geeting />);
        const counterWrapper = wrapper.find(GetNameForm);
    debugger
        expect(counterWrapper.find('greeting').text()).toEqual('0');
    });
});