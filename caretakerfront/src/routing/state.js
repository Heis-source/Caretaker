import React, { Component } from "react";
import axios from 'axios';

export default class States extends Component {

    state = {
        stateArray: [],
    }

    componentDidMount () {
        axios.get('http://localhost:9000/api/users/state')
        .then(response => {
            const stateArray = response.data;
            this.setState({ stateArray });          
        })
    }

    render() {
        const { stateArray } = this.state;
        return (
            <>
            {stateArray.map(states =>
                <option key={states} value={states}>{states}</option>
                )}
            </>
        );
    }
}