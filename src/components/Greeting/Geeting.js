import React from "react";
import GetNameForm from "../GetNameForm/GetNameForm"
import {Redirect} from "react-router";

class Greeting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            error: ""
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let name = e.target['name'].value;
        if (name) {
            this.setState({name: name});
        } else {
            this.setState({error: "Name can't be empty"})
        }
    };

    render() {
        if (this.state.name !== "") {
            return <Redirect to={{
                pathname: '/main',
                name: this.state.name
            }}/>
        }

        return (
            <div>
                <div className="wrapper">
                    <div className="greeting">
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

export default Greeting