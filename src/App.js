import React from 'react';
import {Route, Redirect} from "react-router-dom"
import {BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';
import Greeting from './components/Greeting/Geeting';
import Main from './components/Main/Main';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    };

    redirectToTarget = () => {
        if (this.state.redirectToMain) {
            return <Redirect to='/somewhere'/>;
        }
    };

    render() {
        return (
            <BrowserRouter>
                        {this.redirectToTarget()}
                        <Route
                            path='/greeting'
                            component={() => <Greeting history={this}/>}
                        />
                        <Route
                            path='/main'
                            component={() => <Main name={this.state.name}/>}
                        />
            </BrowserRouter>
        )
    }
}

export default App