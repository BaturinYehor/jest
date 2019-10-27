import React from 'react';
import {Route} from "react-router-dom"
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

    render() {
        return (
            <BrowserRouter>
                <Route
                    path='/greeting'
                    component={() => <Greeting history={this}/>}
                />
                <Route
                    path='/main'
                    component={() => <Main />}
                />
            </BrowserRouter>
        )
    }
}

export default App