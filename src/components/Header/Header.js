import React from "react"

class Header extends React.Component {

    buildHelloString() {
        return "Hello " + this.props.name;
    }

    render() {
        return (
            <div className="text">
                {this.buildHelloString()}
            </div>
        );
    }
}

export default Header