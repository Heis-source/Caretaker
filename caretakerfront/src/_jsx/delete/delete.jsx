import React, { Component } from "react";
import '../../_css/register.css';
import axios from 'axios'

export default class Ads extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            msgFromServer: '',
        };
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        this.logOn(token);
    }

    logOn = (token) => {
        axios.post('http://localhost:9000/api/users/session' , {
            token
        })
        .then(response => {
            const user = response.data.result;
            this.setState({ user });
        })
    }

    delete = (username) => {
        axios.post('http://localhost:9000/api/users/deleteuser' , {
            username
        })
        .then(() => {
            localStorage.clear();
            this.props.history.location("/ads")
        })
        .catch(() => {
            this.setState({ msgFromServer: 'delete error' })
        })
    }
    
    onSubmit = (evt) => {
        evt.preventDefault();
        this.delete(this.state.user.username);
    }

    render() {
        return (
            <div className='form-container rounded mx-auto d-block'>
                <div className="card border-dark mb-3 border-card">
                {this.state.msgFromServer === 'delete error' && (
                    <div className="alert alert-danger" role="alert">
                        Error! Please try again or contact with Caretaker admin.
                    </div>
                )}
                    <div className="card-header text-center">Are you sure?</div>
                    <div className="card-body text-dark">
                        <form onSubmit={this.onSubmit}>
                            <button type="submit" className="btn btn-danger btn-block">Im sure and i want to delete all!</button>
                        </form>
                    </div>
                </div> 
            </div>
        )
    }
}