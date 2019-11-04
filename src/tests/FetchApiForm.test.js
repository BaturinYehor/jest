import {mount} from "enzyme/build";
import FetchApiForm from "../components/FetchApiForm/FetchApiForm";
import React from "react";

const URL = "https://someurl";

it('Button should have correct text', () => {
    const wrapper = mount(<FetchApiForm/>);
    expect(wrapper.find("button").text()).toEqual('What is jest?');
});

describe('FetchApiForm test suite', () => {

    it('Fetch must be successful', done => {
        const message = "Fetched successfully";
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