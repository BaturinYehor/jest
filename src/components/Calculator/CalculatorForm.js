import React from "react";

class CalculatorForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToMain: false,
            response: [],
            error: [],
            message: ""
        }
    };

    calculate = (e) => {
        e.preventDefault();

        let x = e.target['x'].value;
        let y = e.target['y'].value;

        if (!isNaN(x) && !isNaN(y)) {
            if (isNaN(x) && isNaN(y)) {
                throw new Error('Not x neither y was set');
            } else {
                throw new Error('Not x neither y was set');
            }
        } else {
            this.setState({message: x + y})
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.calculate}>
                    <div className="get-name-form">
                        <div className="row">
                            <div className="board">
                                <div className="text">
                                    fill in the fields, press the button and get the result - a number, if the fields
                                    are
                                    filled with numbers, a string-concatenation of characters, if the fields are filled
                                    with
                                    characters
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <input type="text" name="x" placeholder="x"/>
                            </div>
                            <div className="col-sm-6">
                                <div className="board">
                                    <div className="text">
                                        {this.state.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <input type="text" name="y" placeholder="y"/>
                            </div>
                            <div className="col-sm-6">
                                <div className="get-name-button">
                                    <button>Calculate</button>
                                </div>
                            </div>
                            {this.state.error}
                        </div>
                        <div className="row h-50">
                            <div className="col-sm-9">
                            </div>
                            <div className="col-sm-1">
                                <div className="img"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    };
}

export default CalculatorForm