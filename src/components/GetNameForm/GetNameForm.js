import React from "react";

class GetNameForm extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="get-name-form">
                        <div className="row">
                            <input type="text" name="name" placeholder="Name"/>
                        </div>
                        <div className="row h-75">
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