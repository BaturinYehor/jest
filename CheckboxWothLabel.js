import React from 'react';

export default class CheckboxWithLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isChecked: false};
    }

    onChange = () => {
        this.setState({isChecked: !this.state.isChecked});
    };

    calculate = (e) => {
        e.preventDefault();

        let x = e.target['x'].value;
        let y = e.target['y'].value;

        if (!isNaN(x) && !isNaN(y)) {
            if (isNaN(x) && isNaN(y)) {
                throw new Error('Not x neither y was set');
            } else {
                throw new Error('Not x neither y was set');
            }
        } else {
            this.setState({result: x + y})
        }
    };


    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
            </label>
        );
    }
}