import React, { Component } from 'react';

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="row-xs-4">stored notes</div>
        );
    }
}

export default NoteList;