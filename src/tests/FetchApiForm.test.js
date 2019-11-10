import {mount} from "enzyme/build";
import FetchApiForm from "../components/FetchApiForm/FetchApiForm";
import React from "react";
import renderer from "react-test-renderer";

const URL = "https://someurl";
let wrapper;
let instance;

describe("FetchApiForm", () => {

    beforeEach(() => {
        wrapper = mount(<FetchApiForm/>);
        instance = wrapper.instance();
    });

    it('Should match snapshot', () => {
        const component = renderer.create(<FetchApiForm/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Button should have correct text', () => {
        const buttonText = 'What is jest?';
        expect(wrapper.find("button").text()).toEqual(buttonText);
    });

    it('Button should call handler', () => {
        const mock = jest.fn();
        instance.getInformation = mock;
        instance.forceUpdate();
        wrapper.find('button').simulate('click');
        expect(mock.mock.calls.length).toBe(1);
    });

    describe('fetch', () => {

        afterEach(() => {
            global.fetch.mockClear();
            delete global.fetch;
        });

        it('Should be successful', done => {
            const message = "Fetched successfully";
            const mockResponse = {
                info: message
            };

            const mockJsonPromise = Promise.resolve(mockResponse);
            const mockFetchPromise = Promise.resolve({
                json: () => mockJsonPromise,
            });
            global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
            instance.fetchApi(URL);

            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(URL);

            process.nextTick(() => {
                expect(wrapper.state()).toEqual(
                    {
                        error: [],
                        response: message
                    }
                );
                done();
            });
        });

        it('Should set error state when fetch receive error with message', done => {
            const errorMessage = "we were unable to find any matching requests for this method type and the mock path, '/info_dummy', in your collection.";
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
            instance.fetchApi(URL);

            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(URL);

            process.nextTick(() => {
                expect(wrapper.state()).toEqual(
                    {
                        error: errorMessage,
                        response: []
                    }
                );
                done();
            });
        });

        it('Should set error state when fetch throws error', done => {
            const errorMessage = "we were unable to find any matching requests for this method type and the mock path, '/info_dummy', in your collection.";
            const mockResponse = {
                message: errorMessage
            };

            const mockFetchPromise = Promise.reject(mockResponse);
            global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
            instance.fetchApi(URL);

            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenCalledWith(URL);

            process.nextTick(() => {
                expect(wrapper.state()).toEqual(
                    {
                        error: errorMessage,
                        response: []
                    }
                );
                done();
            });
        });
    });
});