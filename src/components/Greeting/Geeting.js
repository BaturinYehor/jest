import React from "react";
import GetNameForm from "../GetNameForm/GetNameForm"

class Greeting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToMain: false
        }
    };

    redirectToTarget = () => {
        this.setState({redirectToMain: true})
    };

    getName = (name) => {
        this.props.history.state.name = name;
    };

    isNameFilled() {
        return this.props.history.state.name.length > 0;
    };

    render() {
        if (this.isNameFilled()) {
            this.redirectToTarget();
        }

        return (
            <div>
                <div className="wrapper">
                    <div className="greeting">
                        <div className="text">
                Give us your name and let's get straight to it!
                        </div>
                <GetNameForm getName={this.getName}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Greeting