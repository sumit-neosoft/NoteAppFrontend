import React, { Component } from 'react';

class ContainerArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="content">
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ContainerArea;
