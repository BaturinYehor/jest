import React from "react";
import FetchApiForm from "../FetchApiForm/FetchApiForm"
import Header from "../Header/Header"
import CalculatorForm from "../CalculatorForm/CalculatorForm";
import {Redirect} from "react-router";

class MainForm extends React.Component {

    render() {
        if (!this.props.name) {
            return <Redirect to='/greeting'/>
        }
        return (
            <div className="nix-background">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <Header name={this.props.name}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <FetchApiForm/>
                            </div>
                            <div className="col-sm-1">
                                <div className="header-divider"></div>
                            </div>
                            <div className="col-sm-5">
                                <CalculatorForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainForm