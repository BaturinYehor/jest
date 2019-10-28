import React from 'react';
import renderer from 'react-test-renderer';
import CalculatorForm from './components/Calculator/CalculatorForm'
import GetNameForm from './components/GetNameForm/GetNameForm'
import Greeting from './components/Greeting/Geeting'
import FetchApiForm from './components/FetchApiForm/FetchApiForm'
import App from './App'
import {mount} from 'enzyme';

describe('Test suite', () => {
    it('snapshot renders', () => {
        const component = renderer.create(<CalculatorForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Greeting form should have exactly one GetNameForm', () => {
        const wrapper = mount(<Greeting/>);
        expect(wrapper.find(GetNameForm).length).toEqual(1);
    });

    it('passes all props to Counter', () => {
        const wrapper = mount(<Greeting/>);
        const counterWrapper = wrapper.find(GetNameForm);
        expect(counterWrapper.find("GetNameForm").find("button").text()).toEqual('Get information');
    });

    it('Greeting text should be correct', () => {
        const wrapper = mount(<Greeting/>);
        expect(wrapper.find(".text").text()).toEqual('Give us your name and let\'s get straight to it!');
    });

    it('Input field should have correct placeholder', () => {
        const wrapper = mount(<Greeting/>);
        const counterWrapper = wrapper.find(GetNameForm);
        expect(counterWrapper.find("GetNameForm").find("input").props().placeholder).toEqual("Name");
    });

    it('Error should arise', () => {
        const wrapper = mount(<Greeting/>);
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
        const expectedName = "Nick";

        const appContainer = mount(<App/>);
        const greetingContainer = mount(<Greeting history={appContainer.instance()}/>);
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

    it('submit handler should be called', () => {
        let submit = jest.fn();
        const wrapper = mount(<GetNameForm handleSubmit={submit}/>);
        wrapper.find('button').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
    });


    it('Fetch should ', () => {
        let submit = jest.fn();
        const wrapper = mount(<GetNameForm handleSubmit={submit}/>);
        wrapper.find('button').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
    });

    it('fetches data from api success', done => {
        const message = "some message";
        const URL = "https://961826c1-030a-4d64-9117-ed8352256d12.mock.pstmn.io/info";
        const mockResponse = {
            info: message
        };
        const e = {
            preventDefault: () => {
            },
        };

        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        //jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);


        const wrapper = mount(<FetchApiForm/>);
        wrapper.instance().getApiData(e);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(URL);

        process.nextTick(() => {
            expect(wrapper.state()).toEqual(
                {
                    error: [],
                    response: message
                }
            );

            global.fetch.mockClear();
            delete global.fetch;
            done();
        });
    });
});