import React from "react";

const API = 'https://961826c1-030a-4d64-9117-ed8352256d12.mock.pstmn.io/info';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToMain: false,
            response: [],
            error: []
        }
    };

    getApiData = async (e) => {
        e.preventDefault();
        fetch(API)
            .then(response => response.json())
            .then((data) => {
                this.setState({response: data})
            })
            .catch((error) => {
                this.setState({error: error})
            });
    };

    render() {
        return (
            <div>
                <button onClick={this.getApiData}>
                    What is jest?
                </button>
                <div className="get-api-form">
                    <div className="text">
                        {this.state.response.info}
                    </div>
                </div>
            </div>
        )
    };
}

export default Main