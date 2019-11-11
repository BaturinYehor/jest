import React from "react";

class NotFoundPage extends React.Component {

    render() {
        return (
            <div className='wrapper'>
                <div className="card-form">
                    <div className='text'>
                        <div>404 page not found</div>
                        <a href='/greeting'>To greeting form</a>
                        <div className="img"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFoundPage