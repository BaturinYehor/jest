import React from 'react';
import renderer from 'react-test-renderer';
import GetNameForm from '../components/GetNameForm/GetNameForm'
import GreetingForm from '../components/GreetingForm/GeetingForm'
import FetchApiForm from '../components/FetchApiForm/FetchApiForm'
import Main from '../components/Main/Main'
import App from '../App'
import {mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';

describe('Test suite', () => {

    it('Greeting form should match snapshot', () => {
        const component = renderer.create(<GreetingForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Greeting form form should have exactly one GetNameForm', () => {
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

    it('Submit handler should be called', () => {
        let submit = jest.fn();
        const wrapper = mount(<GetNameForm handleSubmit={submit}/>);
        wrapper.find('button').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
    });

    it('should redirect to main', () => {
        const history = {
            state: {
                name: "some name"
            }
        };

        const wrapper = mount(<BrowserRouter>
            <GreetingForm history={history}/>
        </BrowserRouter>);
        const wrapper2 = mount(<Main/>);
    });

    it('Fetch must be successful', done => {
        const message = "Fetched successfully";
        const URL = "https://someurl";
        const mockResponse = {
            info: message
        };

        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const wrapper = mount(<FetchApiForm/>);
        wrapper.instance().fetchApi(URL);

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

    it('Fetch should produce error', done => {
        const errorMessage = "we were unable to find any matching requests for this method type and the mock path, '/info_dummy', in your collection.";
        const URL = "https://someurl";
        const mockResponse = {
            error: {
                message: errorMessage
            }
        };

        const mockJsonPromise = Promise.resolve(mockResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const wrapper = mount(<FetchApiForm/>);
        wrapper.instance().fetchApi(URL);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(URL);

        process.nextTick(() => {
            expect(wrapper.state()).toEqual(
                {
                    error: errorMessage,
                    response: []
                }
            );

            global.fetch.mockClear();
            delete global.fetch;
            done();
        });
    });

    it('Fetch should catch an error', done => {
        const errorMessage = "we were unable to find any matching requests for this method type and the mock path, '/info_dummy', in your collection.";
        const URL = "https://961826c1-030a-4d64-9117-ed8352256d12.mock.pstmn.io/info_dummy";
        const mockResponse = {
            message: errorMessage
        };

        const mockFetchPromise = Promise.reject(mockResponse);
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

        const wrapper = mount(<FetchApiForm/>);
        wrapper.instance().fetchApi(URL);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(URL);

        process.nextTick(() => {
            expect(wrapper.state()).toEqual(
                {
                    error: errorMessage,
                    response: []
                }
            );

            global.fetch.mockClear();
            delete global.fetch;
            done();
        });
    });
});