import React from "react";
import GetNameForm from "../GetNameForm/GetNameForm"
import {Redirect} from "react-router";

class GreetingForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: ""
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let name = e.target['name'].value;
        if (name) {
            this.props.history.setState({name: name});
        } else {
            this.setState({error: "Name can't be empty"})
        }
    };

    render() {
        if (this.props.history && this.props.history.state.name) {
            return <Redirect to={{pathname: '/main'}}/>
        }

        return (
            <div>
                <div className="nix-background">
                    <div className="card-form">
                        <div className="text">
                            Give us your name and let's get straight to it!
                        </div>
                        <GetNameForm handleSubmit={this.handleSubmit}/>
                        <div className="error">
                            {this.state.error}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GreetingForm