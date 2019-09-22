import React from "react";
import {Redirect} from "react-router-dom"

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            error: ""
        }
    };

    handleChange = (e) => {
        e.preventDefault();

        let name = e.target[0].value;
        if (name.length === 0) {
            this.setState({error: "Name can't be empty"})
        } else {
            this.setState({name: name});
            this.props.getName(name)
        }
    };

    render() {
        if (this.state.name) {
            return <Redirect to='/main'/>
        }
        return (
            <div>
                <form onSubmit={this.handleChange}>
                    <div className="get-name-form">
                        <div className="row">
                            <input type="text" name="name" placeholder="Name"/>
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
                <div className="error">
                    {this.state.error}
                </div>
            </div>
        );
    }
}

export default Form