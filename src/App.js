import React from 'react';
import {Route} from "react-router-dom"
import {BrowserRouter} from 'react-router-dom/cjs/react-router-dom.min';
import GreetingForm from './components/GreetingForm/GeetingForm';
import Main from './components/Main/Main';

class
App extends React.Component {

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
                    component={() => <GreetingForm history={this}/>}
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