import React from "react";

class GetNameForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            handleSubmit: () => {},
        }
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="get-name-form">
                        <div className="row">
                            <input type="text" name="name" placeholder="name"/>
                        </div>
                        <div className="row h-50">
                            <div className="col-sm-10">
                                <div className="get-name-button">
                                    <button>Get information</button>
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <div className="img"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default GetNameForm