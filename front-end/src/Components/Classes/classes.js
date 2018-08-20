import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
class Classes extends Component {
    render() {
        return (
            <div>
                <Button onClick={() => { this.props.history.replace('/') }}>
                    Log Out
                </Button>

                <h1>CLASSES</h1>
            </div>
        )
    }
}

export default Classes;

