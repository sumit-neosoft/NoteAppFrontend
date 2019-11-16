import React, { Component } from 'react';
import DraftEditor from '../DraftEditor';

class ContentArea extends Component {
    render() {
        return (
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                <DraftEditor />
            </div>
        );
    }
}

export default ContentArea