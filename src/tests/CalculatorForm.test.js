import {mount} from "enzyme/build";
import CalculatorForm from "../components/CalculatorForm/CalculatorForm";
import React from "react";
import renderer from "react-test-renderer";

let wrapper;
let instance;

describe("CalculatorForm", () => {

    beforeEach(() => {
        wrapper = mount(<CalculatorForm/>);
        instance = wrapper.instance();
    });

    it('Should match snapshot', () => {
        const calculatorForm = renderer.create(<CalculatorForm/>);
        let tree = calculatorForm.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Calculate button should call handler', () => {
        const mock = jest.fn();
        instance.handleSubmit = mock;
        instance.forceUpdate();
        wrapper.find('button').simulate('submit');
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it('Submit handler should call calculator with right parameters', () => {
        const e = {
            preventDefault: () => {
            },
            target: {
                x: {
                    value: "a"
                },
                y: {
                    value: "b"
                }
            }
        };
        const mock = jest.fn();
        instance.calculate = mock;
        instance.handleSubmit(e);
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toBeCalledWith('a', "b")
    });

    it('Submit handler should set correct state depends on passed parameters', () => {
        const mock = jest.fn();
        mock.mockReturnValueOnce({"error": "", "result": "ab"});
        const e = {
            preventDefault: () => {
            },
            target: {
                x: {
                    value: "a"
                },
                y: {
                    value: "b"
                }
            }
        };
        instance.calculate = mock;

        instance.handleSubmit(e);
        expect(instance.state).toStrictEqual({"error": "", "result": "ab"});

        e.target.x = undefined;
        instance.handleSubmit(e);
        expect(instance.state).toStrictEqual({error: "x or y value is empty!", result: ""});

        e.target.x = "a";
        e.target.y = undefined;
        instance.handleSubmit(e);
        expect(instance.state).toStrictEqual({error: "x or y value is empty!", result: ""});

        e.target.x = undefined;
        e.target.y = undefined;
        instance.handleSubmit(e);
        expect(instance.state).toStrictEqual({error: "x or y value is empty!", result: ""});

        expect(mock.mock.calls.length).toBe(1);
    });

    it('calculate function should return correct result depends on passed parameters', () => {
        expect(instance.calculate('a', 'b')).toStrictEqual({"error": "", "result": "ab"});
        expect(instance.calculate('1', 'x')).toStrictEqual({"error": "", "result": "1x"});
        expect(instance.calculate('1', '2')).toStrictEqual({"error": "", "result": 3});
        expect(instance.calculate('x', '')).toStrictEqual({"error": "x or y value is empty!", "result": ""});
        expect(instance.calculate('', '')).toStrictEqual({"error": "x or y value is empty!", "result": ""});
        expect(instance.calculate('', 'x')).toStrictEqual({"error": "x or y value is empty!", "result": ""});
        expect(instance.calculate('x')).toStrictEqual({"error": "x or y value is empty!", "result": ""});
        expect(instance.calculate(undefined, 'x')).toStrictEqual({"error": "x or y value is empty!", "result": ""});
        expect(instance.calculate(undefined, undefined)).toStrictEqual({
            "error": "x or y value is empty!",
            "result": ""
        });
    });

    it('Should have correct text', () => {
        const expectedTest = "fill in the fields, press the button and get the result - a number," +
            " if the fields are filled with numbers, a string-concatenation of characters," +
            " if the fields are filled with characters";
        expect(wrapper.find(".text").get(0).props.children).toEqual(expectedTest);
    });

    it('Fields should have correct placeholders', () => {
        expect(wrapper.find("input").get(0).props.placeholder).toEqual('x');
        expect(wrapper.find("input").get(1).props.placeholder).toEqual('y');
    });

    it('Error should be rendered', () => {
        const state = {
            error: "Expected error",
            result: ""
        };
        wrapper.setState(state);
        expect(wrapper.find(".error").get(0).props.children).toEqual('Expected error');
    });

    it('Result should be rendered', () => {
        const state = {
            error: "",
            result: "ab"
        };
        wrapper.setState(state);
        expect(wrapper.find(".text").get(1).props.children).toEqual('ab');
    });

    it('Button should have correct text', () => {
        expect(wrapper.find("button").text()).toEqual('Calculate');
    });

});