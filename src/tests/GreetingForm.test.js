import React from 'react';
import renderer from 'react-test-renderer';
import GetNameForm from '../components/GetNameForm/GetNameForm'
import GreetingForm from '../components/GreetingForm/GeetingForm'
import App from '../App'
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom/cjs/react-router-dom.min';

describe('GreetingForm test suite', () => {

    it('GreetingForm should match snapshot', () => {
        const component = renderer.create(<GreetingForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('GreetingForm form should have exactly one GetNameForm', () => {
        const wrapper = mount(<GreetingForm/>);
        expect(wrapper.find(GetNameForm).length).toEqual(1);
    });

    it('GreetingForm text should be correct', () => {
        const wrapper = mount(<GreetingForm/>);
        expect(wrapper.find(".text").text()).toEqual('Give us your name and let\'s get straight to it!');
    });

    it('Error should arise when passing empty name', () => {
        let expectedName = "Name can't be empty";
        const wrapper = mount(<GreetingForm/>);
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
        expect(wrapper.instance().state.error).toEqual(expectedName);
    });

    it('Name should be set', () => {
        const expectedName = "Nick";

        const appContainer = mount(<App/>);
        const greetingContainer = mount(<GreetingForm history={appContainer.instance()}/>);
        const e = {
            preventDefault: () => {
            },

            target: {
                name: {
                    value: expectedName
                }
            }
        };
        greetingContainer.instance().handleSubmit(e);
        expect(appContainer.instance().state.name).toEqual(expectedName);
    });

    it('should redirect to main', () => {
        const history = {
            state: {
                name: "somename"
            }
        };

        const wrapper = mount(
            <MemoryRouter>
                <GreetingForm history={history}/>
            </MemoryRouter>
        );
        const app = wrapper.find(GreetingForm).instance();
        expect(app.render().props.to.pathname).toBe("/main")
    });
});