import React from 'react';
import Calculator from '../src/components/Calculator/CalculatorForm';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

test('renders correctly', () => {
    const tree = renderer.create(<Calculator />).toJSON();
    expect(tree).toMatchSnapshot();
});

describe('App component', () => {
    it('starts with a count of 0', () => {
        const wrapper = shallow(<Calculator />);
        const text = wrapper.find('p').text();
        expect(text).toEqual('Count: 0');
    });
});