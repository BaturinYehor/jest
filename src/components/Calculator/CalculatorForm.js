import React from "react";

class CalculatorForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToMain: false,
            response: [],
            error: []
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleChange}>
                    <div className="get-name-form">
                        <div className="row">
                            <input type="text" name="x" placeholder="x"/>
                        </div>
                        <div className="row">
                            <input type="text" name="y" placeholder="y"/>
                        </div>
                        <div className="row h-50">
                            <div className="col-sm-9">
                                <div className="get-name-button">
                                    <button>Calculate</button>
                                </div>
                            </div>
                            <div className="col-sm-3">
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