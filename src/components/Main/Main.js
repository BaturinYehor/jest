import React from "react";
import FetchApiForm from "../FetchApiForm/FetchApiForm"
import Header from "../Header/Header"
import {Redirect} from "react-router-dom"

class Main extends React.Component {

    render() {
        if (!this.props.name) {
            return <Redirect to='/greeting'/>
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5">
                        <Header name={this.props.name}/>
                    </div>
                    <div className="col-sm-7">
                        <FetchApiForm/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main