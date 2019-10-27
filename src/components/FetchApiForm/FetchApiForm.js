import React from "react";

const API = 'https://961826c1-030a-4d64-9117-ed8352256d12.mock.pstmn.io/info';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            response: [],
            error: []
        }
    };

    getApiData = async (e) => {
        e.preventDefault();
        fetch(API)
            .then(response => response.json())
            .then((data) => {
                if (data.info) {
                    this.setState({response: data.info});//information fetched from api
                } else {
                    this.setState({error: data.error.message})//can't find api to fetch
                }
            })
            .catch((error) => {
                this.setState({error: error})//error while fetching information from api
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
                        {this.state.response}
                        <div className="error">
                            {this.state.error}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Main