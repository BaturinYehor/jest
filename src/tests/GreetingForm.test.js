import React from 'react';
import renderer from 'react-test-renderer';
import GetNameForm from '../components/GetNameForm/GetNameForm'
import GreetingForm from '../components/GreetingForm/GeetingForm'
import App from '../App'
import {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom/cjs/react-router-dom.min';

let wrapper;
let instance;

describe('GreetingForm', () => {

    beforeEach(() => {
        wrapper = mount(<GreetingForm/>);
        instance = wrapper.instance();
    });

    it('Should match snapshot', () => {
        const component = renderer.create(<GreetingForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Should contains exactly one GetNameForm', () => {
        expect(wrapper.find(GetNameForm).length).toEqual(1);
    });

    it('Text should be correct', () => {
        const text = 'Give us your name and let\'s get straight to it!';
        expect(wrapper.find(".text").text()).toEqual(text);
    });

    it('Error should arise when passing empty name', () => {
        let expectedName = "Name can't be empty";
        const e = {
            preventDefault: () => {
            },
            target: {
                name: {
                    value: ""
                }
            }
        };
        instance.handleSubmit(e);
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

    it('Should redirect to main', () => {
        const history = {
            state: {
                name: "Nick"
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